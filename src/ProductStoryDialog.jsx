import { ArrowRight } from "@phosphor-icons/react/ArrowRight";
import { CheckCircle } from "@phosphor-icons/react/CheckCircle";
import { UserFocus } from "@phosphor-icons/react/UserFocus";
import { WarningCircle } from "@phosphor-icons/react/WarningCircle";
import { X } from "@phosphor-icons/react/X";
import { useEffect, useRef } from "react";

export function ProductStoryDialog({ story, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (story && !dialog.open) dialog.showModal();
    if (!story && dialog.open) dialog.close();
  }, [story]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [onClose]);

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      className={story ? `product-dialog product-dialog--${story.id}` : "product-dialog"}
      ref={dialogRef}
      aria-labelledby={story ? "product-story-title" : undefined}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
    >
      {story ? (
        <article className="product-story">
          <header className="product-story-header">
            <div>
              <span className="product-story-kicker">{story.category}</span>
              <h2 id="product-story-title">{story.title}</h2>
            </div>
            <button className="dialog-close" type="button" onClick={closeDialog} aria-label="Close product overview">
              <X aria-hidden="true" size={22} />
            </button>
          </header>

          <div className="product-story-scroll">
            <section className="product-story-hero">
              <p className="product-story-lead">{story.lead}</p>
              <div className="product-promise">
                <span>Product promise</span>
                <strong>{story.promise}</strong>
              </div>
            </section>

            <dl className="product-facts">
              {story.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>

            <section className="product-audience">
              <UserFocus aria-hidden="true" size={30} weight="light" />
              <div>
                <span>Who it is for</span>
                <p>{story.audience}</p>
              </div>
            </section>

            <section className="product-story-section">
              <div className="product-section-heading">
                <span>01</span>
                <div>
                  <h3>Product journey</h3>
                  <p>The experience from first intent to a useful result.</p>
                </div>
              </div>
              <ol className="product-journey">
                {story.journey.map((step, index) => (
                  <li key={step.title}>
                    <div className="journey-number">{String(index + 1).padStart(2, "0")}</div>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                    {index < story.journey.length - 1 ? <ArrowRight aria-hidden="true" size={18} /> : null}
                  </li>
                ))}
              </ol>
            </section>

            <section className="product-story-section">
              <div className="product-section-heading">
                <span>02</span>
                <div>
                  <h3>What the product makes possible</h3>
                  <p>Capabilities people can experience in the current build.</p>
                </div>
              </div>
              <div className="product-capabilities">
                {story.capabilities.map((capability) => (
                  <article key={capability.title}>
                    <span className="capability-marker" />
                    <h4>{capability.title}</h4>
                    <p>{capability.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="product-proof-grid">
              <div className="product-proof">
                <div className="product-section-heading compact">
                  <span>03</span>
                  <div><h3>Implementation evidence</h3></div>
                </div>
                <ul>
                  {story.evidence.map((item) => (
                    <li key={item}>
                      <CheckCircle aria-hidden="true" size={18} weight="fill" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="product-boundary">
                <WarningCircle aria-hidden="true" size={22} weight="light" />
                <div>
                  <span>Honest boundary</span>
                  <p>{story.boundary}</p>
                </div>
              </aside>
            </section>
          </div>
        </article>
      ) : null}
    </dialog>
  );
}
