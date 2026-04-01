import Phaser from 'phaser';

/**
 * Tap & Match game scene — ages 3-6.
 * Player taps items to match pairs (e.g., animal → sound, letter → picture).
 */
export default class TapMatchScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TapMatchScene' });
    this.selected = null;
    this.matches = 0;
    this.score = 0;
  }

  create() {
    const gameData = this.registry.get('gameData');
    if (!gameData?.levels?.length) return;

    const level = gameData.levels[0];
    this.items = level.items;
    this.totalPairs = this.items.length;

    // Title
    this.add.text(400, 30, gameData.title, {
      fontSize: '28px',
      fontFamily: 'Arial',
      color: '#333',
    }).setOrigin(0.5);

    // Score display
    this.scoreText = this.add.text(700, 20, 'Score: 0', {
      fontSize: '20px',
      color: '#666',
    });

    // Create match cards
    this.createCards();
  }

  createCards() {
    const cards = [];

    this.items.forEach((item, i) => {
      // Prompt card
      cards.push({ text: item.prompt, pairId: i, type: 'prompt' });
      // Answer card
      const answer = typeof item.correct_answer === 'string'
        ? item.correct_answer
        : String(item.correct_answer);
      cards.push({ text: answer, pairId: i, type: 'answer' });
    });

    // Shuffle
    Phaser.Utils.Array.Shuffle(cards);

    const cols = 4;
    const cardW = 160;
    const cardH = 80;
    const startX = 120;
    const startY = 100;

    cards.forEach((card, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = startX + col * (cardW + 15);
      const y = startY + row * (cardH + 15);

      const bg = this.add.rectangle(x, y, cardW, cardH, 0x4a90d9, 1)
        .setInteractive({ useHandCursor: true })
        .setStrokeStyle(2, 0x2c5f8a);

      const label = this.add.text(x, y, card.text, {
        fontSize: '16px',
        color: '#fff',
        fontFamily: 'Arial',
        wordWrap: { width: cardW - 20 },
        align: 'center',
      }).setOrigin(0.5);

      bg.setData('card', card);
      bg.setData('label', label);

      bg.on('pointerdown', () => this.onCardTap(bg));
      bg.on('pointerover', () => bg.setFillStyle(0x5ba3ec));
      bg.on('pointerout', () => {
        if (!bg.getData('matched')) bg.setFillStyle(0x4a90d9);
      });
    });
  }

  onCardTap(cardObj) {
    if (cardObj.getData('matched')) return;

    const card = cardObj.getData('card');

    if (!this.selected) {
      this.selected = cardObj;
      cardObj.setFillStyle(0xf5a623);
      return;
    }

    if (this.selected === cardObj) {
      this.selected = null;
      cardObj.setFillStyle(0x4a90d9);
      return;
    }

    const prevCard = this.selected.getData('card');

    if (prevCard.pairId === card.pairId && prevCard.type !== card.type) {
      // Match found
      this.selected.setFillStyle(0x7ed321);
      cardObj.setFillStyle(0x7ed321);
      this.selected.setData('matched', true);
      cardObj.setData('matched', true);
      this.matches++;
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);

      if (this.matches === this.totalPairs) {
        this.add.text(400, 500, 'Well done!', {
          fontSize: '36px',
          color: '#7ed321',
          fontFamily: 'Arial',
        }).setOrigin(0.5);
      }
    } else {
      // No match — flash red and reset
      this.selected.setFillStyle(0xd0021b);
      cardObj.setFillStyle(0xd0021b);
      const prev = this.selected;
      this.time.delayedCall(400, () => {
        prev.setFillStyle(0x4a90d9);
        cardObj.setFillStyle(0x4a90d9);
      });
    }

    this.selected = null;
  }
}
