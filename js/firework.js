class Firework {
  constructor(x, y, r, vx, vy, gra) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.gra = gra;
    this.particles = [];
    this.self = new Particle(this.x, this.y, r, vx, vy, gra);
  }

  update() {
    this.self.update();
    const is = random() < 0.2;
    if (!this.self.maxTop && this.self.vy >= 0) {
      this.self.maxTop = true;
      for (let i = 0; i < 400; i++) {

        let y = random(-15, 10)
        const x = random(-10, 10);

        if (x < -7) y = random(-7, 10);
        else if (x > 7) y = random(7, -10);


        this.particles.push(
          new Particle(
            this.self.x,
            this.self.y,
            this.self.r,
            x,
            y,
            this.self.gra,
            is ? randomColor() : this.self.color,
            true
          )
        );
      }
    }

    if (this.self.y > scrHeight) {
      this.self.complite = true;
    }
    this.particles.forEach(particle => {
      particle.update();
    });
  }

  draw() {
    !this.self.maxTop && this.self.draw();
    this.particles.forEach(particle => {
      particle.draw();
    });
  }
}

class Particle {
  constructor(x, y, r, vx, vy, gra, color = randomColor(), fire) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.gra = gra;
    this.dr = random(1.02, 1.1);
    this.dv = random(1.02, 1.06);
    this.maxTop = false;
    this.complite = false;
    this.fire = fire;
  }

  update() {
    this.vy += this.gra;
    this.x += this.vx;
    this.y += this.vy;
    if (this.fire) {
      this.r /= this.dr;
      this.vx /= this.dv;
      this.vy /= this.dv;
      this.dv *= 1.01;
    }
  }

  draw() {
    color(this.color);
    arc(this.x, this.y, this.r);
  }
}