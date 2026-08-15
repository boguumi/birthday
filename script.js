document.addEventListener('DOMContentLoaded', () => {
  // Hier legst du die richtigen Antworten für die Rätsel fest.
  const correctAnswers = {
    '1': '42', // Antwort für das Rätsel mit data-riddle="1". Ändere '42' zu deiner Zahl.
    '2': '7',  // Antwort für das Rätsel mit data-riddle="2". Ändere '7' zu deiner Zahl.
    '3': '13', // Antwort für das Rätsel mit data-riddle="3". Ändere '13' zu deiner Zahl.
    '4': '25'  // Antwort für das Rätsel mit data-riddle="4". Ändere '25' zu deiner Zahl.
    // '2': 'andereZahl' // Hier könntest du die Antwort für das zweite Rätsel hinzufügen
  };

  function switchSection(currentSection, nextSection) {
    if (currentSection && nextSection) {
      // 1. Starte die Ausblend-Animation für die aktuelle Sektion
      currentSection.classList.add('exiting');
      
      // 2. Blende die nächste Sektion ein
      nextSection.classList.add('active');

      // 3. Räume nach der Animation auf
      currentSection.addEventListener('transitionend', () => {
        currentSection.classList.remove('active', 'exiting');
      }, { once: true }); // Der Listener wird nur einmal ausgeführt
    }
  }

  // Wir lauschen auf Klicks im gesamten Dokument. Das ist effizienter.
  document.body.addEventListener('click', (event) => {
    // Überprüfen, ob ein Button mit dem data-action="next-section" geklickt wurde.
    if (event.target.matches('button[data-action="next-section"]')) {
      // Finde die aktuelle, aktive Sektion
      const currentSection = document.querySelector('section.active');
      // Finde die nächste Sektion im HTML
      const nextSection = currentSection.nextElementSibling;

      // Wenn es eine aktuelle und eine nächste Sektion gibt...
      if (currentSection && nextSection && nextSection.tagName === 'SECTION') {
        switchSection(currentSection, nextSection);
      }
    }

    // Überprüfen, ob der "Antwort prüfen"-Button geklickt wurde.
    if (event.target.matches('button[data-action="check-answer"]')) {
      const currentSection = event.target.closest('section');
      const input = currentSection.querySelector('input');
      const riddleId = currentSection.dataset.riddle;

      // Vergleiche die Benutzereingabe mit der richtigen Antwort
      if (input.value === correctAnswers[riddleId]) {
        // alert('Richtig! Auf zum nächsten Hinweis.'); // Entfernt, um die Animation nicht zu blockieren

        const nextSection = currentSection.nextElementSibling;
        switchSection(currentSection, nextSection);
      } else {
        alert('Leider falsch. Versuche es noch einmal!');
        input.value = ''; // Setzt das Eingabefeld für einen neuen Versuch zurück.
      }
    }

    // Überprüfen, ob einer der finalen "Wählen"-Buttons geklickt wurde.
    if (event.target.matches('button[data-action^="choose-"]')) {
      const selectedCard = event.target.closest('.card');
      
      // Finde alle Karten, um sicherzustellen, dass nur eine ausgewählt ist.
      const allCards = selectedCard.closest('.grid').querySelectorAll('.card');
      
      // Entferne die 'selected'-Klasse von allen Karten.
      allCards.forEach(card => card.classList.remove('selected'));
      
      // Füge die 'selected'-Klasse zur angeklickten Karte hinzu.
      selectedCard.classList.add('selected');
    }
  });
});
