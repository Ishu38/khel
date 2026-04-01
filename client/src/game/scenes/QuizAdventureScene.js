import Phaser from 'phaser';

/**
 * Quiz Adventure scene — ages 9-12.
 * Story-driven MCQ with character progression.
 */
export default class QuizAdventureScene extends Phaser.Scene {
  constructor() {
    super({ key: 'QuizAdventureScene' });
    this.currentItem = 0;
    this.score = 0;
    this.lives = 3;
  }

  create() {
    const gameData = this.registry.get('gameData');
    if (!gameData?.levels?.length) return;

    this.levelData = gameData.levels[0];
    this.items = this.levelData.items;

    // Background
    this.add.rectangle(400, 300, 800, 600, 0xf8f9fa);

    // Header
    this.add.text(400, 25, gameData.title, {
      fontSize: '22px', color: '#333', fontFamily: 'Arial',
    }).setOrigin(0.5);

    this.scoreText = this.add.text(20, 15, `Score: 0`, { fontSize: '16px', color: '#666' });
    this.livesText = this.add.text(680, 15, `Lives: ❤️❤️❤️`, { fontSize: '16px', color: '#666' });
    this.progressText = this.add.text(400, 55, '', { fontSize: '14px', color: '#999' }).setOrigin(0.5);

    this.showItem(0);
  }

  showItem(index) {
    if (index >= this.items.length || this.lives <= 0) {
      this.showResults();
      return;
    }

    if (this.itemGroup) this.itemGroup.destroy(true);
    this.itemGroup = this.add.group();

    this.currentItem = index;
    const item = this.items[index];
    this.progressText.setText(`Question ${index + 1} of ${this.items.length}`);

    // Question card
    const card = this.add.rectangle(400, 220, 680, 120, 0xffffff).setStrokeStyle(1, 0xe0e0e0);
    const question = this.add.text(400, 220, item.prompt, {
      fontSize: '20px', color: '#222', fontFamily: 'Arial',
      wordWrap: { width: 640 }, align: 'center',
    }).setOrigin(0.5);

    this.itemGroup.addMultiple([card, question]);

    // Answer buttons (2x2 grid)
    const answers = [item.correct_answer, ...item.distractors].slice(0, 4);
    Phaser.Utils.Array.Shuffle(answers);

    const positions = [
      { x: 250, y: 350 }, { x: 550, y: 350 },
      { x: 250, y: 420 }, { x: 550, y: 420 },
    ];

    answers.forEach((ans, i) => {
      if (i >= positions.length) return;
      const { x, y } = positions[i];
      const btn = this.add.rectangle(x, y, 260, 50, 0x4a90d9, 1)
        .setInteractive({ useHandCursor: true })
        .setStrokeStyle(1, 0x2c5f8a);
      const label = this.add.text(x, y, String(ans), {
        fontSize: '16px', color: '#fff',
        wordWrap: { width: 240 }, align: 'center',
      }).setOrigin(0.5);

      btn.on('pointerdown', () => this.checkAnswer(ans, item));
      btn.on('pointerover', () => btn.setFillStyle(0x5ba3ec));
      btn.on('pointerout', () => btn.setFillStyle(0x4a90d9));

      this.itemGroup.addMultiple([btn, label]);
    });

    // Hint button
    if (item.hint) {
      const hintBtn = this.add.text(400, 500, '💡 Hint', {
        fontSize: '14px', color: '#f5a623', fontFamily: 'Arial',
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      hintBtn.on('pointerdown', () => {
        this.add.text(400, 540, item.hint, {
          fontSize: '13px', color: '#888', fontFamily: 'Arial',
          wordWrap: { width: 600 }, align: 'center',
        }).setOrigin(0.5);
        hintBtn.destroy();
      });

      this.itemGroup.add(hintBtn);
    }
  }

  checkAnswer(selected, item) {
    const correct = String(selected) === String(item.correct_answer);

    if (correct) {
      this.score += item.points || 10;
      this.scoreText.setText(`Score: ${this.score}`);
    } else {
      this.lives--;
      this.livesText.setText(`Lives: ${'❤️'.repeat(this.lives)}`);
    }

    // Brief feedback then next
    const feedback = this.add.text(400, 280, correct ? '✓ Correct!' : `✗ Answer: ${item.correct_answer}`, {
      fontSize: '18px', color: correct ? '#7ed321' : '#d0021b',
    }).setOrigin(0.5);

    this.time.delayedCall(800, () => {
      feedback.destroy();
      this.showItem(this.currentItem + 1);
    });
  }

  showResults() {
    if (this.itemGroup) this.itemGroup.destroy(true);

    const total = this.items.length * 10;
    const pct = Math.round((this.score / total) * 100);

    this.add.text(400, 250, this.lives > 0 ? 'Adventure Complete!' : 'Game Over', {
      fontSize: '32px', color: this.lives > 0 ? '#7ed321' : '#d0021b',
    }).setOrigin(0.5);

    this.add.text(400, 310, `Score: ${this.score}/${total} (${pct}%)`, {
      fontSize: '22px', color: '#333',
    }).setOrigin(0.5);
  }
}
