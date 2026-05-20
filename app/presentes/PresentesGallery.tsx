/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, useMemo, useState } from "react";
import { Heart, Lock, X } from "lucide-react";
import styles from "./PresentesGallery.module.css";

type PreviewPhoto = {
  id: number;
  previewSrc: string;
};

type UnlockedMemory = {
  memoryId: number;
  guestName: string;
  unlockToken: string;
};

type MemoryDetails = {
  id: number;
  imageSrc: string;
  story: string;
};

type ApiMessage = {
  success: false;
  message?: string;
  error?: string;
  detail?: string;
};

const minimumGiftAmount = 100;

export default function PresentesGallery({ photos }: { photos: PreviewPhoto[] }) {
  const [showIntro, setShowIntro] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [giftAmount, setGiftAmount] = useState("");
  const [showPaymentFields, setShowPaymentFields] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [unlockedMemories, setUnlockedMemories] = useState<
    Record<number, UnlockedMemory>
  >({});
  const [memoryDetails, setMemoryDetails] = useState<MemoryDetails | null>(
    null
  );
  const [loadingMemory, setLoadingMemory] = useState(false);

  useEffect(() => {
    async function loadUnlockedMemories() {
      try {
        const response = await fetch("/api/unlocked-memories", {
          cache: "no-store",
        });
        const data = (await response.json()) as
          | { success: true; memories: UnlockedMemory[] }
          | ApiMessage;

        if (response.ok && data.success) {
          setUnlockedMemories(
            Object.fromEntries(
              data.memories.map((memory) => [memory.memoryId, memory])
            )
          );
        }
      } catch {
        setUnlockedMemories({});
      }
    }

    void loadUnlockedMemories();
  }, []);

  const selectedPhoto = useMemo(() => {
    if (selected === null) {
      return null;
    }

    return photos[selected];
  }, [photos, selected]);

  const selectedUnlock = selectedPhoto
    ? unlockedMemories[selectedPhoto.id]
    : undefined;

  useEffect(() => {
    async function loadMemoryDetails() {
      if (!selectedPhoto || !selectedUnlock) {
        setMemoryDetails(null);
        return;
      }

      setLoadingMemory(true);

      try {
        const response = await fetch(
          `/api/memory/${selectedPhoto.id}?token=${selectedUnlock.unlockToken}`,
          { cache: "no-store" }
        );
        const data = (await response.json()) as
          | { success: true; memory: MemoryDetails }
          | ApiMessage;

        if (response.ok && data.success) {
          setMemoryDetails(data.memory);
        } else {
          setMemoryDetails(null);
        }
      } finally {
        setLoadingMemory(false);
      }
    }

    void loadMemoryDetails();
  }, [selectedPhoto, selectedUnlock]);

  function closeGiftModal() {
    setSelected(null);
    setBuyerName("");
    setBuyerEmail("");
    setGiftAmount("");
    setShowPaymentFields(false);
    setPaymentError("");
    setLoadingPayment(false);
    setMemoryDetails(null);
  }

  function startGiftFlow() {
    setShowPaymentFields(true);
    setPaymentError("");
  }

  async function createPayment() {
    if (!selectedPhoto) {
      return;
    }

    const amount = Number(giftAmount.replace(",", "."));

    if (!Number.isFinite(amount) || amount < minimumGiftAmount) {
      setPaymentError("O valor mínimo para desbloquear uma memória é R$100 ❤️");
      return;
    }

    if (!buyerName.trim() || !buyerEmail.trim()) {
      setPaymentError("Informe nome e e-mail para seguir com o presente.");
      return;
    }

    setLoadingPayment(true);
    setPaymentError("");

    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memoryId: selectedPhoto.id,
          guestName: buyerName,
          guestEmail: buyerEmail,
          amount,
        }),
      });
      const data = (await response.json()) as
        | { success: true; init_point?: string; preference_id?: string }
        | ApiMessage;

      if (!response.ok || !data.success || !data.init_point) {
        const apiError =
          "error" in data
            ? [data.error, data.detail].filter(Boolean).join(" ")
            : "message" in data
              ? data.message
              : "";

        throw new Error(
          apiError || "Não foi possível iniciar o pagamento."
        );
      }

      window.location.href = data.init_point;
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Não foi possível iniciar o pagamento."
      );
      setLoadingPayment(false);
    }
  }

  return (
    <>
      <section className={styles.galleryGrid}>
        {photos.slice(0, 60).map((photo, index) => {
          const unlocked = unlockedMemories[photo.id];

          return (
            <button
              key={photo.id}
              className={styles.galleryItem}
              type="button"
              aria-label={`Abrir memória ${photo.id}`}
              data-photo-number={photo.id}
              onClick={() => setSelected(index)}
            >
              <img
                src={photo.previewSrc}
                alt={`Memória ${photo.id}`}
                className={`${styles.galleryImage} ${
                  unlocked ? styles.unlockedImage : styles.lockedImage
                }`}
              />
              {!unlocked && (
                <>
                  <span className={styles.photoOverlay} />
                  <span className={styles.lockBadge} aria-hidden="true">
                    <Lock size={28} strokeWidth={1.8} />
                  </span>
                </>
              )}
              {unlocked && (
                <span className={styles.unlockedName}>
                  {unlocked.guestName}
                </span>
              )}
            </button>
          );
        })}
      </section>

      {showIntro && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalCard} ${styles.introCard}`}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setShowIntro(false)}
              aria-label="Fechar"
            >
              <X size={16} />
            </button>

            <p className={styles.modalEyebrow}>Presentes</p>
            <h2 className={styles.modalTitle}>
              Uma forma diferente de presentear <Heart size={28} />
            </h2>
            <p className={styles.modalText}>
              Cada presente ajuda a construir o próximo capítulo da nossa
              história.
            </p>
            <p className={styles.modalText}>
              Como forma de agradecimento, algumas lembranças especiais poderão
              ser reveladas ao longo dessa jornada.
            </p>
            <p className={styles.modalText}>
              Obrigado por fazer parte desse momento tão importante para nós.
            </p>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => setShowIntro(false)}
            >
              Explorar memórias
            </button>
          </div>
        </div>
      )}

      {selectedPhoto && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalCard} ${styles.giftCard}`}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeGiftModal}
              aria-label="Fechar"
            >
              <X size={16} />
            </button>

            {selectedUnlock ? (
              <>
                <p className={styles.modalEyebrow}>
                  Memória {String(selectedPhoto.id).padStart(2, "0")}
                </p>
                <div className={styles.modalImageWrap}>
                  <img
                    src={memoryDetails?.imageSrc ?? selectedPhoto.previewSrc}
                    alt={`Memória ${selectedPhoto.id}`}
                    className={`${styles.modalImage} ${styles.unlockedImage}`}
                  />
                </div>
                <h2 className={styles.modalTitle}>Memória revelada</h2>
                <p className={styles.modalText}>
                  {loadingMemory
                    ? "Carregando lembrança..."
                    : memoryDetails?.story ?? "Esta memória foi revelada."}
                </p>
                <p className={styles.buyerText}>
                  Revelada por {selectedUnlock.guestName}
                </p>
              </>
            ) : (
              <>
                <span className={styles.modalLock}>
                  <Lock size={24} />
                </span>
                <h2 className={styles.modalTitle}>Memória protegida</h2>
                <p className={styles.modalText}>
                  Esta lembrança será revelada após sua contribuição ❤️
                </p>

                {showPaymentFields && (
                  <div className={styles.paymentFields}>
                    <label className={styles.inputLabel} htmlFor="buyerName">
                      Seu nome
                    </label>
                    <input
                      id="buyerName"
                      className={styles.input}
                      value={buyerName}
                      onChange={(event) => {
                        setBuyerName(event.target.value);
                        setPaymentError("");
                      }}
                      placeholder="Digite seu nome"
                    />

                    <label className={styles.inputLabel} htmlFor="buyerEmail">
                      Seu e-mail
                    </label>
                    <input
                      id="buyerEmail"
                      className={styles.input}
                      value={buyerEmail}
                      onChange={(event) => {
                        setBuyerEmail(event.target.value);
                        setPaymentError("");
                      }}
                      placeholder="voce@email.com"
                      type="email"
                    />

                    <label className={styles.inputLabel} htmlFor="giftAmount">
                      Valor do presente
                    </label>
                    <input
                      id="giftAmount"
                      className={styles.input}
                      value={giftAmount}
                      onChange={(event) => {
                        setGiftAmount(event.target.value);
                        setPaymentError("");
                      }}
                      inputMode="decimal"
                      placeholder="R$ 100"
                    />

                    {paymentError && (
                      <p className={styles.paymentError}>{paymentError}</p>
                    )}
                  </div>
                )}

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={showPaymentFields ? createPayment : startGiftFlow}
                    disabled={loadingPayment}
                  >
                    {loadingPayment
                      ? "Abrindo pagamento..."
                      : showPaymentFields
                        ? "Ir para pagamento"
                        : "Presentear"}
                  </button>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={closeGiftModal}
                  >
                    Ver outras memórias
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
