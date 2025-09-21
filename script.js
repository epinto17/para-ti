document.addEventListener('DOMContentLoaded', () => {
    

    const flowersContainer = document.querySelector('.flowers-container');
    const starsContainer = document.querySelector('.shooting-stars');
    const letterContainer = document.getElementById('letter-container');
    const card = document.getElementById('card');
    const heartsContainer = document.getElementById('hearts-container');

 
    const NUM_FLOWERS = 5;
    const NUM_GRASS = 10;
    const PETALS_PER_FLOWER = 12;

    /**
     *
     * @param {number} index 
     */
    function createFlower(index) {
        const flowerDiv = document.createElement('div');
        flowerDiv.className = `flower flower--${index}`;

        const leafsDiv = document.createElement('div');
        leafsDiv.className = `flower__leafs flower__leafs--${index}`;

        for (let i = 0; i < PETALS_PER_FLOWER; i++) {
            const rotation = (360 / PETALS_PER_FLOWER) * i;
            const leaf = document.createElement('div');
            leaf.className = 'flower__leaf';
            leaf.style.setProperty('--rotation', `${rotation}deg`);
            leafsDiv.appendChild(leaf);
        }
        
        const whiteCircle = document.createElement('div');
        whiteCircle.className = 'flower__white-circle';
        leafsDiv.appendChild(whiteCircle);

        for (let i = 1; i <= 8; i++) {
            const light = document.createElement('div');
            light.className = `flower__light flower__light--${i}`;
            leafsDiv.appendChild(light);
        }

        const lineDiv = document.createElement('div');
        lineDiv.className = 'flower__line';
        for (let i = 1; i <= 4; i++) {
            const leaf = document.createElement('div');
            leaf.className = `flower__line__leaf flower__line__leaf--${i}`;
            lineDiv.appendChild(leaf);
        }

        flowerDiv.appendChild(leafsDiv);
        flowerDiv.appendChild(lineDiv);
        flowersContainer.appendChild(flowerDiv);
    }

    /**
     * 
     * @param {number} index 
     */
    function createGrass(index) {
        const grassDiv = document.createElement('div');
        grassDiv.className = `flower__grass flower__grass--${index}`;

        grassDiv.innerHTML = `
            <div class="flower__grass--top"></div>
            <div class="flower__grass--bottom"></div>
            <div class="flower__grass__leaf flower__grass__leaf--1"></div>
            <div class="flower__grass__leaf flower__grass__leaf--2"></div>
            <div class="flower__grass__leaf flower__grass__leaf--3"></div>
            <div class="flower__grass__leaf flower__grass__leaf--4"></div>
            <div class="flower__grass__leaf flower__grass__leaf--5"></div>
            <div class="flower__grass__leaf flower__grass__leaf--6"></div>
            <div class="flower__grass__leaf flower__grass__leaf--7"></div>
            <div class="flower__grass__leaf flower__grass__leaf--8"></div>
            <div class="flower__grass__overlay"></div>
        `;
        flowersContainer.appendChild(grassDiv);
    }
    
   
    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        star.style.top = `${Math.random() * 60}%`;
        star.style.animationDuration = `${Math.random() * 1.5 + 2}s`;
      
        starsContainer.appendChild(star);
      
        setTimeout(() => star.remove(), 4000); 
    }

    /**
     *
     * @param {number} count 
     */
    function createHearts(count) {
        const letterRect = letterContainer.getBoundingClientRect();
        const startX = letterRect.left + letterRect.width / 2;
        const startY = letterRect.top + letterRect.height / 2;

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = '💛';
                heart.style.left = `${startX}px`;
                heart.style.top = `${startY}px`;

                const offsetX = (Math.random() - 0.5) * 200;
                heart.style.transform = `translateX(${offsetX}px)`;
                
                heartsContainer.appendChild(heart);

                setTimeout(() => heart.remove(), 4000);
            }, i * 100);
        }
    }


    letterContainer.addEventListener('click', () => {
        if (letterContainer.classList.contains('open')) {
    
            letterContainer.classList.remove('open');
            card.classList.remove('visible');

      
            setTimeout(() => {
                card.classList.add('hidden');
            }, 800); 

        } else {
          
            letterContainer.classList.add('open');
            card.classList.remove('hidden');
            
            setTimeout(() => {
                card.classList.add('visible');
                createHearts(30);
            }, 100);
        }
    });

    for (let i = 1; i <= NUM_FLOWERS; i++) createFlower(i);
    for (let i = 1; i <= NUM_GRASS; i++) createGrass(i);

    setInterval(createShootingStar, 3000);

    document.body.classList.remove("not-loaded");
});
