const canvas = document.querySelector("#myCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight/2;
    }

    window.addEventListener ('resize', resizeCanvas);
    resizeCanvas();

    const DOT_COUNT = 30;
    const RADIUS = 2;
    let dots = [];
    const DIST_MAX = 50;

    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dx = Math.random()*4 - 2;
        this.dy = Math.random()*4 - 2;
    }

    Dot.prototype.update = function() {
        this.x += this.dx;
        this.y += this.dy;
    }

    Dot.prototype.draw = function() {
        ctx.fillStyle = "hotpink";
        ctx.beginPath();
        ctx.arc(this.x, this.y, RADIUS, 0, Math.PI*2);
        ctx.fill();

        if (this.x < 0 || this.x > canvas.width){
            this.dx *= -1;
        }
        if (this.y < 0 || this.y > canvas.height){
            this.dy *= -1;
        }

        for (let i = 0; i<dots.length; i++){
            for (let j=i+1; j<dots.length; j++){
                const distance = Math.sqrt((dots[i].x-dots[j].x)**2, (dots[i].y-dots[j].y)**2)
                if (distance < DIST_MAX){
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(dots[j].x, dots[j].y);
                    ctx.strokeStyle = "rgba(255,100,200, " + (1 - distance/DIST_MAX) + ")";
                    ctx.lineWidth = 1 - distance/DIST_MAX;
                    ctx.stroke();
                    for (let k = j+1; k<dots.length; k++){
                        const k_i_dist = Math.sqrt((dots[k].x-dots[i].x)**2, (dots[k].y-dots[i].y)**2);
                        const k_j_dist = Math.sqrt((dots[k].x-dots[j].x)**2, (dots[k].y-dots[j].y)**2);
                        if (k_i_dist < DIST_MAX && k_j_dist < DIST_MAX){
                            perimtotal = distance + k_i_dist + k_j_dist;
                            fillVal = .67 - (perimtotal < DIST_MAX*2 ? perimtotal : DIST_MAX*2)/(DIST_MAX*3);
                            ctx.beginPath();
                            ctx.moveTo(dots[i].x, dots[i].y);
                            ctx.lineTo(dots[j].x, dots[j].y);
                            ctx.lineTo(dots[k].x, dots[k].y);
                            console.log(fillVal);
                            ctx.fillStyle = "rgba(255,255,255, " + fillVal + ")";
                            ctx.fill();
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i<DOT_COUNT; i++){
            dots.push(new Dot());
        }
    
    function animate(){
        //clear the prior screen
        ctx.fillStyle = "turquoise";
        ctx.fillRect (0,0,canvas.width,canvas.height)

        //Update and draw each dot
        dots.forEach(dot => {
            dot.update();
            dot.draw();
        });
        requestAnimationFrame(animate);
    }
        //Request the next frame.
    animate();