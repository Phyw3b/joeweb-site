/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./PresentesGallery.module.css";

type Photo = {
  src: string;
  story: string;
};

type Purchase = {
  buyer: string;
};

const storageKey = "jo-web-presentes-historias";

export default function PresentesGallery({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [paid, setPaid] = useState(false);
  const [purchases, setPurchases] = useState<Record<number, Purchase>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(storageKey);

      if (saved) {
        setPurchases(JSON.parse(saved));
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(purchases));
  }, [purchases]);

  const selectedPhoto = useMemo(() => {
    if (selected === null) {
      return null;
    }

    return photos[selected];
  }, [photos, selected]);

  const selectedPurchase =
    selected === null ? undefined : purchases[selected + 1];

  function closeModal() {
    setSelected(null);
    setBuyerName("");
    setPaid(false);
  }

  function confirmPurchase() {
    if (selected === null || !buyerName.trim()) {
      return;
    }

    setPurchases((current) => ({
      ...current,
      [selected + 1]: { buyer: buyerName.trim() },
    }));
    setPaid(false);
  }

  return (
    <>
      <section className={styles.galleryGrid}>
        {photos.slice(0, 60).map((photo, index) => {
          const purchase = purchases[index + 1];
          const unlocked = Boolean(purchase);

          return (
            <button
              key={index}
              className={styles.galleryItem}
              type="button"
              aria-label={`Abrir foto ${index + 1}`}
              data-photo-number={index + 1}
              onClick={() => setSelected(index)}
            >
              <img
                src={photo.src}
                alt={`Foto ${index + 1}`}
                className={`${styles.galleryImage} ${
                  unlocked ? styles.unlockedImage : styles.lockedImage
                }`}
              />
              {unlocked && (
                <span className={styles.unlockedMark}>
                  {purchase.buyer}
                </span>
              )}
            </button>
          );
        })}
      </section>

      {selectedPhoto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Fechar"
            >
              X
            </button>

            <p className={styles.modalEyebrow}>
              História {String((selected ?? 0) + 1).padStart(2, "0")}
            </p>

            <div className={styles.modalImageWrap}>
              <img
                src={selectedPhoto.src}
                alt={`Foto ${(selected ?? 0) + 1}`}
                className={`${styles.modalImage} ${
                  selectedPurchase ? styles.unlockedImage : styles.lockedImage
                }`}
              />
            </div>

            {selectedPurchase ? (
              <>
                <h2 className={styles.modalTitle}>História desbloqueada</h2>
                <p className={styles.modalText}>{selectedPhoto.story}</p>
                <p className={styles.buyerText}>
                  Desbloqueada por {selectedPurchase.buyer}
                </p>
              </>
            ) : (
              <>
                <h2 className={styles.modalTitle}>Desbloquear memória</h2>
                <p className={styles.modalText}>
                  Esta história ainda está em preto e branco. Faça uma compra
                  simulada para colorir a foto e liberar o texto para todos.
                </p>

                <label className={styles.inputLabel} htmlFor="buyerName">
                  Seu nome
                </label>
                <input
                  id="buyerName"
                  className={styles.input}
                  value={buyerName}
                  onChange={(event) => setBuyerName(event.target.value)}
                  placeholder="Digite seu nome"
                />

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => setPaid(true)}
                  >
                    Pagar
                  </button>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={confirmPurchase}
                    disabled={!paid || !buyerName.trim()}
                  >
                    Confirmar
                  </button>
                </div>

                {paid && (
                  <p className={styles.simulationText}>
                    Pagamento simulado aprovado. Confirme para desbloquear.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
