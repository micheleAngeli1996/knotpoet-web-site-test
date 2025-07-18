import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  imports: [UpperCasePipe],
  template: `
    <div class="container mx-auto px-4 py-20">
      <h1 class="text-muted">{{ 'knotpoet.com Privacy Policy' | uppercase }}</h1>
      <h3>Ultimo aggiornamento: 18/06/2025</h3>

      <p>La presente Privacy Policy descrive come Knot Poet raccoglie, utilizza e protegge i dati personali degli utenti che visitano il sito <a href="https://www.knotpoet.com" target="_blank">www.knotpoet.com</a> (di seguito “Sito”).</p>

      <ol>
        <li>
          <strong>Titolare del trattamento</strong><br/>
          Knot Poet<br/>
          Email di contatto: inof&commat;knotpoet.com
        </li>

        <li>
          <strong>Tipi di dati raccolti</strong>
          <ol type="a">
            <li>
              <strong>Dati forniti volontariamente dall’utente</strong>
              <ul>
                <li>Modulo di contatto: nome, indirizzo email, messaggio.</li>
                <li>Newsletter: indirizzo email.</li>
              </ul>
            </li>
            <li>
              <strong>Dati di navigazione</strong>
              <p>Durante la navigazione, il sito può raccogliere dati tecnici come:</p>
              <ul>
                <li>Indirizzo IP</li>
                <li>Tipo di browser e dispositivo</li>
                <li>Pagine visitate e tempo di permanenza</li>
                <li>Questi dati vengono raccolti tramite cookie e strumenti analitici.</li>
              </ul>
            </li>
            <li>
              <strong>Finalità del trattamento</strong>
              <p>I dati sono raccolti per le seguenti finalità:</p>
              <ul>
                <li>Rispondere a richieste inviate tramite il modulo di contatto</li>
                <li>Inviare comunicazioni promozionali, aggiornamenti e novità musicali via email (newsletter)</li>
                <li>Analizzare in forma anonima il traffico del sito (statistiche di visita)</li>
              </ul>
            </li>
            <li>
              <strong>Base giuridica del trattamento</strong>
              <ul>
                <li>Consenso dell’utente (newsletter e modulo contatto)</li>
                <li>Legittimo interesse del titolare (analisi statistiche anonime)</li>
              </ul>
            </li>
            <li>
              <strong>Modalità del trattamento e sicurezza</strong>
              <p>Il trattamento avviene tramite strumenti elettronici, nel rispetto delle misure di sicurezza previste dalla normativa (art. 32 del GDPR), per evitare accessi non autorizzati, divulgazione o perdita dei dati.</p>
            </li>
            <li>
              <strong>Conservazione dei dati</strong>
              <p>I dati del modulo di contatto saranno conservati per il tempo necessario a gestire la richiesta.</p>
              <p>I dati della newsletter saranno conservati fino alla revoca del consenso da parte dell’utente.</p>
            </li>
            <li>
              <strong>Comunicazione dei dati a terzi</strong>
              <p>I dati non saranno venduti né ceduti a terzi. Tuttavia, possono essere trattati da soggetti terzi che forniscono servizi tecnici (es. hosting, invio newsletter), nominati responsabili del trattamento ai sensi dell’art. 28 GDPR.</p>
            </li>
            <li>
              <strong>Diritti dell’utente</strong>
              <p>L’utente può in qualsiasi momento esercitare i seguenti diritti:</p>
              <ul>
                <li>Accedere ai propri dati</li>
                <li>Richiederne la rettifica o cancellazione</li>
                <li>Opporsi al trattamento</li>
                <li>Revocare il consenso</li>
                <li>Richiedere la portabilità dei dati</li>
                <li>Presentare reclamo all’autorità di controllo (<a href="https://www.garanteprivacy.it" target="_blank">Garante per la protezione dei dati personali</a>)</li>
              </ul>
              <p>Le richieste vanno inviate via email a inof&commat;knotpoet.com</p>
            </li>
            <li>
              <strong>Cookie Policy</strong>
              <p>Il Sito utilizza cookie tecnici e analitici. Al primo accesso, l’utente può accettare o rifiutare i cookie tramite un apposito banner.</p>
              <p>Per maggiori dettagli è disponibile la nostra Cookie Policy.</p>
            </li>
            <li>
              <strong>Modifiche alla Privacy Policy</strong>
              <p>Knot Poet si riserva il diritto di aggiornare questa informativa. Gli utenti saranno informati tramite il sito o via email in caso di modifiche rilevanti.</p>
            </li>
          </ol>
        </li>
      </ol>
    </div>
  `,
  styleUrl: './privacy-policy.css'
})
export class PrivacyPolicy {

}
