import Phaser from 'phaser';

/**
 * Maze Runner game scene — ages 6-9.
 * Navigate a maze, solve questions at each gate to proceed.
 */
export default class MazeRunnerScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MazeRunnerScene' });
    this.currentItem = 0;
    this.score = 0;
  }

  create() {
    const gameData = this.registry.get('gameData');
    if (!gameData?.levels?.length) return;

    this.levelData = gameData.levels[0];
    this.items = this.levelData.items;

    this.add.text(400, 20, gameData.title, {
      fontSize: '24px', color: '#333', fontFamily: 'Arial',
    }).setOrigin(0.5);

    this.scoreText = this.add.text(700, 15, 'Score: 0', {
      fontSize: '18px', color: '#666',
    });

    // Player sprite (simple circle)
    this.player = this.add.circle(100, 300, 18, 0x4a90d9).setStrokeStyle(2, 0x2c5f8a);

    // Create gates along a path
    this.gates = [];
    this.items.forEach((item, i) => {
      const x = 180 + i * 120;
      const gate = this.add.rectangle(x, 300, 12, 80, 0xd0021b).setStrokeStyle(1, 0x900);
      gate.setData('itemIndex', i);
      gate.setData('solved', false);
      this.gates.push(gate);

      // Gate number
      this.add.text(x, 260, `${i + 1}`, {
        fontSize: '14px', color: '#999',
      }).setOrigin(0.5);
    });

    // Path line
    this.add.line(0, 0, 60, 300, 180 + this.items.length * 120 + 40, 300, 0xcccccc)
      .setOrigin(0).setLineWidth(2);

    // Finish flag
    this.finishX = 180 + this.items.length * 120 + 40;
    this.add.text(this.finishX, 290, '🏁', { fontSize: '32px' }).setOrigin(0.5);

    this.showQuestion(0);
  }

  showQuestion(index) {
    if (index >= this.items.length) {
      this.showVictory();
      return;
    }

    // Clear previous question UI
    if (this.questionGroup) this.questionGroup.destroy(true);
    this.questionGroup = this.add.group();

    const item = this.items[index];
    const qBg = this.add.rectangle(400, 480, 700, 140, 0xffffff, 0.95).setStrokeStyle(1, 0xddd);
    const qText = this.add.text(400, 430, item.prompt, {
      fontSize: '18px', color: '#333', fontFamily: 'Arial',
      wordWrap: { width: 650 }, align: 'center',
    }).setOrigin(0.5);

    this.questionGroup.addMultiple([qBg, qText]);

    // Answer options
    const answers = [item.correct_answer, ...item.distractors].slice(0, 4);
    Phaser.Utils.Array.Shuffle(answers);

    answers.forEach((ans, i) => {
      const bx = 150 + i * 170;
      const btn = this.add.rectangle(bx, 520, 150, 36, 0x4a90d9)
        .setInteractive({ useHandCursor: true })
        .setStrokeStyle(1, 0x2c5f8a);
      const label = this.add.text(bx, 520, String(ans), {
        fontSize: '14px', color: '#fff', fontFamily: 'Arial',
      }).setOrigin(0.5);

      btn.on('pointerdown', () => this.checkAnswer(index, ans, item.correct_answer));
      btn.on('pointerover', () => btn.setFillStyle(0x5ba3ec));
      btn.on('pointerout', () => btn.setFillStyle(0x4a90d9));

      this.questionGroup.addMultiple([btn, label]);
    });
  }

  checkAnswer(gateIndex, selected, correct) {
    const isCorrect = String(selected) === String(correct);

    if (isCorrect) {
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
      this.gates[gateIndex].setFillStyle(0x7ed321);
      this.gates[gateIndex].setData('solved', true);

      // Animate player through gate
      const targetX = 180 + (gateIndex + 1) * 120 - 40;
      this.tweens.add({
        targets: this.player,
        x: targetX,
        duration: 500,
        ease: 'Power2',
        onComplete: () => this.showQuestion(gateIndex + 1),
      });
    } else {
      // Flash gate red
      this.gates[gateIndex].setFillStyle(0xff0000);
      this.time.delayedCall(300, () => this.gates[gateIndex].setFillStyle(0xd0021b));
    }
  }

  showVictory() {
    if (this.questionGroup) this.questionGroup.destroy(true);

    this.tweens.add({
      targets: this.player,
      x: this.finishX,
      duration: 600,
      ease: 'Power2',
    });

    this.add.text(400, 480, `Maze Complete! Score: ${this.score}`, {
      fontSize: '28px', color: '#7ed321', fontFamily: 'Arial',
    }).setOrigin(0.5);
  }
}
