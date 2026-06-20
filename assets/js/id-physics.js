document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("physicsContainer");
  const idCardDom = document.getElementById("physicalIdCard");
  
  if (!container || !idCardDom || typeof Matter === 'undefined') return;

  const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        Constraint = Matter.Constraint,
        Events = Matter.Events;

  // Initialize engine
  const engine = Engine.create({
    positionIterations: 20,
    velocityIterations: 15
  });
  const world = engine.world;
  
  // Set gravity
  engine.gravity.y = 3.5;

  // Set up renderer
  let width = container.clientWidth;
  const height = container.clientHeight;

  const OVERFLOW_PADDING_X = 0;
  const OVERFLOW_PADDING_Y = 200;

  const render = Render.create({
    element: container,
    engine: engine,
    options: {
      width: width + OVERFLOW_PADDING_X * 2,
      height: height + OVERFLOW_PADDING_Y * 2,
      wireframes: false,
      showConstraints: false,
      background: 'transparent',
      pixelRatio: window.devicePixelRatio
    }
  });

  // Position canvas
  render.canvas.style.position = 'absolute';
  render.canvas.style.top = `-${OVERFLOW_PADDING_Y}px`;
  render.canvas.style.left = `-${OVERFLOW_PADDING_X}px`;
  render.canvas.style.width = `${width + OVERFLOW_PADDING_X * 2}px`;
  render.canvas.style.height = `${height + OVERFLOW_PADDING_Y * 2}px`;
  render.canvas.style.pointerEvents = 'none';
  render.canvas.classList.add('lace');

  // Constants
  const group = Matter.Body.nextGroup(true);
  const segmentLength = 22;
  const segmentWidth = 6;
  
  // Calculate anchor point
  const rect = container.getBoundingClientRect();
  const containerTop = rect.top + window.scrollY;
  let lastContainerTop = containerTop;
  let lastContainerWidth = width;
  
  let anchorX = OVERFLOW_PADDING_X + width / 2;
  const isStacked = window.innerWidth < 992;
  let anchorY = isStacked ? (OVERFLOW_PADDING_Y - 40) : (OVERFLOW_PADDING_Y - containerTop);
  
  const targetRestingY = OVERFLOW_PADDING_Y + 60;
  const totalLaceLength = targetRestingY - anchorY;
  const lanyardLength = totalLaceLength / segmentLength;
  let maxLaceLength = totalLaceLength;

  const maroonColor = '#0B1B4A';

  //card body
  const cardWidth = 250;
  const cardHeight = 375;
  const cardBody = Bodies.rectangle(
    anchorX, 
    anchorY + maxLaceLength + (cardHeight/2), 
    cardWidth, 
    cardHeight, 
    { 
      collisionFilter: { group: group, category: 0x0002 },
      frictionAir: 0.02,
      density: 0.05,
      render: { visible: false }
    }
  );

  // Set up constraint
  const cardConstraint = Constraint.create({
    pointA: { x: anchorX, y: anchorY },
    bodyB: cardBody,
    pointB: { x: 0, y: -cardHeight/2 + 5 },
    length: maxLaceLength,
    stiffness: 1,
    damping: 0,
    render: { visible: false }
  });

  Composite.add(world, [cardBody, cardConstraint]);

 
  const mouse = Mouse.create(container);
  Mouse.setOffset(mouse, { x: -OVERFLOW_PADDING_X, y: -OVERFLOW_PADDING_Y });
  const initialScale = getContainerScale();
  mouse.scale = { x: 1 / initialScale, y: 1 / initialScale };

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    collisionFilter: { mask: 0x0002 },
    constraint: {
      stiffness: 0.2,
      render: { visible: false }
    }
  });

  function getContainerScale() {
    const transform = window.getComputedStyle(container).transform;
    if (transform && transform !== 'none') {
      const values = transform.match(/matrix\(([^)]+)\)/);
      if (values) {
        const parts = values[1].split(',').map(Number);
        return parts[0];
      }
    }
    return 1;
  }

  // Handle document level mouse events for drag behavior
  window.addEventListener('mousemove', (e) => {
    if (mouse.button === 0) {
      const bounds = container.getBoundingClientRect();
      const scale = getContainerScale();
      mouse.position.x = (e.clientX - bounds.left) / scale + OVERFLOW_PADDING_X;
      mouse.position.y = (e.clientY - bounds.top) / scale + OVERFLOW_PADDING_Y;
      mouse.absolute.x = mouse.position.x;
      mouse.absolute.y = mouse.position.y;
    }
  });

  window.addEventListener('mouseup', () => {
    mouse.button = -1;
  });

  // Mobile touch support
  window.addEventListener('touchmove', (e) => {
    if (mouse.button === 0 && e.touches.length > 0) {
      const touch = e.touches[0];
      const bounds = container.getBoundingClientRect();
      const scale = getContainerScale();
      mouse.position.x = (touch.clientX - bounds.left) / scale + OVERFLOW_PADDING_X;
      mouse.position.y = (touch.clientY - bounds.top) / scale + OVERFLOW_PADDING_Y;
      mouse.absolute.x = mouse.position.x;
      mouse.absolute.y = mouse.position.y;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.button = -1;
  });

  // Prevent default browser dragging and text selection behaviors
  idCardDom.addEventListener('dragstart', (e) => e.preventDefault());
  idCardDom.addEventListener('mousedown', () => {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  });
  idCardDom.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  }, { passive: false });

  Composite.add(world, mouseConstraint);

  render.mouse = mouse;

  // Handle constraints update
  Events.on(engine, 'beforeUpdate', function() {
    const currentRect = container.getBoundingClientRect();
    const currentContainerTop = currentRect.top + window.scrollY;
    const currentContainerWidth = container.clientWidth;
    
    if (currentContainerTop !== lastContainerTop || currentContainerWidth !== lastContainerWidth) {
      const shiftX = (currentContainerWidth - lastContainerWidth) / 2;
      
      const isStackedMode = window.innerWidth < 992;
      const newAnchorY = isStackedMode ? (OVERFLOW_PADDING_Y - 40) : (OVERFLOW_PADDING_Y - currentContainerTop);
      const shiftY = newAnchorY - anchorY;
      
      Matter.Body.setPosition(cardBody, {
        x: cardBody.position.x + shiftX,
        y: cardBody.position.y + shiftY
      });
      Matter.Body.setVelocity(cardBody, { x: 0, y: 0 });
      
      lastContainerTop = currentContainerTop;
      lastContainerWidth = currentContainerWidth;
      
      width = currentContainerWidth;
      anchorX = OVERFLOW_PADDING_X + width / 2;
      anchorY = newAnchorY;
      
      const newLaceLength = targetRestingY - anchorY;
      maxLaceLength = newLaceLength;
      cardConstraint.length = newLaceLength;
      
      cardConstraint.pointA.x = anchorX;
      cardConstraint.pointA.y = anchorY;
      
      const pr = window.devicePixelRatio || 1;
      render.options.width = width + OVERFLOW_PADDING_X * 2;
      render.canvas.width = (width + OVERFLOW_PADDING_X * 2) * pr;
      render.canvas.style.width = (width + OVERFLOW_PADDING_X * 2) + 'px';
      render.canvas.style.height = (container.clientHeight + OVERFLOW_PADDING_Y * 2) + 'px';
    }

    const attachmentX = cardBody.position.x - (-cardHeight/2 + 5) * Math.sin(cardBody.angle);
    const attachmentY = cardBody.position.y + (-cardHeight/2 + 5) * Math.cos(cardBody.angle);
    
    const dx = attachmentX - anchorX;
    const dy = attachmentY - anchorY;
    const distance = Math.sqrt(dx*dx + dy*dy);
    const maxDist = maxLaceLength;
    
    if (distance < maxDist) {
      if (mouseConstraint.body === cardBody) {
        cardConstraint.length = distance; 
      } else {
        cardConstraint.length = Math.min(maxDist, cardConstraint.length + 20);
      }
    } else {
      if (cardConstraint.length < maxDist - 1) {
        Matter.Body.setVelocity(cardBody, {
          x: cardBody.velocity.x * 0.4, 
          y: cardBody.velocity.y * 0.4
        });
      }
      cardConstraint.length = maxDist;
    }
  });

  // Sync DOM element with physics body positions
  Events.on(engine, 'afterUpdate', function() {
    // Out of bounds safety net
    const outOfBoundsX = Math.abs(cardBody.position.x - anchorX) > 2000;
    const outOfBoundsY = Math.abs(cardBody.position.y - anchorY) > 2000;
    
    if (outOfBoundsX || outOfBoundsY) {
      Matter.Body.setPosition(cardBody, { x: anchorX, y: anchorY + 200 });
      Matter.Body.setVelocity(cardBody, { x: 0, y: 0 });
    }

    const x = cardBody.position.x - cardWidth / 2 - OVERFLOW_PADDING_X;
    const y = cardBody.position.y - cardHeight / 2 - OVERFLOW_PADDING_Y;
    const angle = cardBody.angle;

    const velocityX = cardBody.velocity.x;
    const velocityY = cardBody.velocity.y;
    
    const tiltX = Math.max(-30, Math.min(30, velocityY * -1.5));
    const tiltY = Math.max(-30, Math.min(30, velocityX * 1.5));

    idCardDom.style.transform = `translate(${x}px, ${y}px) perspective(1000px) rotateZ(${angle}rad) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    // Handle shimmer reflection effect
    const speed = Math.sqrt(velocityX*velocityX + velocityY*velocityY);
    if (speed > 0.5) {
      idCardDom.classList.add('is-moving');
      idCardDom.style.setProperty('--glare-x', `${tiltY * -2}%`);
      idCardDom.style.setProperty('--glare-y', `${tiltX * 2}%`);
    } else {
      idCardDom.classList.remove('is-moving');
    }
  });

  // Render lanyard curve
  Events.on(render, 'afterRender', function() {
    const context = render.context;
    
    const attachmentPoint = {
      x: cardBody.position.x - (-cardHeight/2 + 5) * Math.sin(cardBody.angle),
      y: cardBody.position.y + (-cardHeight/2 + 5) * Math.cos(cardBody.angle)
    };

    const midX = (anchorX + attachmentPoint.x) / 2;
    const midY = (anchorY + attachmentPoint.y) / 2;

    const bowX = -cardBody.velocity.x * 2.5;
    const bowY = -cardBody.velocity.y * 2.5;

    const dx = attachmentPoint.x - anchorX;
    const dy = attachmentPoint.y - anchorY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const maxDist = maxLaceLength;
    const slack = Math.max(0, maxDist - dist); 

    const cpX = midX + bowX;
    let cpY = midY + bowY + (slack * 1.5);

    if (cpY < anchorY) {
      cpY = anchorY + Math.abs(cpY - anchorY);
    }

    const drawLace = (width, color, shadow = false) => {
      context.beginPath();
      context.moveTo(anchorX, anchorY);
      context.quadraticCurveTo(cpX, cpY, attachmentPoint.x, attachmentPoint.y);
      context.lineWidth = width;
      context.strokeStyle = color;
      context.lineJoin = 'round';
      context.lineCap = 'round';
      if (shadow) {
        context.shadowColor = 'rgba(0, 0, 0, 0.4)';
        context.shadowBlur = 15;
        context.shadowOffsetY = 10;
      } else {
        context.shadowColor = 'transparent';
        context.shadowBlur = 0;
        context.shadowOffsetY = 0;
      }
      context.stroke();
    };

    const isStackedMode = window.innerWidth < 992;
    const ts = isStackedMode ? 0.6 : 0.8;

    // Draw 3D shadow and fabric highlights
    drawLace(40 * ts, 'rgba(0,0,0,0.1)', true);
    drawLace(40 * ts, '#0d0d0d');
    drawLace(36 * ts, '#1b1b1b');
    drawLace(18 * ts, '#404040');
    drawLace(5 * ts, 'rgba(255,255,255,0.10)');

    // Draw metal clip connector
    context.shadowColor = 'rgba(0,0,0,0.5)';
    context.shadowBlur = 5;
    context.shadowOffsetY = 3;
    
    const clipAngle = Math.atan2(attachmentPoint.y - cpY, attachmentPoint.x - cpX);
    
    context.save();
    context.translate(attachmentPoint.x, attachmentPoint.y);
    context.rotate(clipAngle);

    context.beginPath();
    context.rect(-10, -12, 20, 24);
    context.fillStyle = '#b0b5b9';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#6e7377';
    context.stroke();

    context.beginPath();
    context.rect(-8, -10, 8, 20);
    context.fillStyle = '#ffffff';
    context.fill();

    context.beginPath();
    context.arc(0, 6, 3, 0, Math.PI * 2);
    context.fillStyle = '#4a4d50';
    context.fill();

    context.restore();
    
    context.shadowColor = 'transparent';
    context.shadowBlur = 0;
    context.shadowOffsetY = 0;
  });

  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  
  setTimeout(() => {
    container.classList.remove('badge-entrance');
  }, 1600);

  
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newRect = container.getBoundingClientRect();
    const newContainerTop = newRect.top + window.scrollY;
    
    const isStackedMode = window.innerWidth < 992;
    const newAnchorX = OVERFLOW_PADDING_X + newWidth / 2;
    const newAnchorY = isStackedMode ? (OVERFLOW_PADDING_Y - 40) : (OVERFLOW_PADDING_Y - newContainerTop);
    
    const newLaceLength = targetRestingY - newAnchorY;
    
    const shiftX = newAnchorX - anchorX;
    const shiftY = newAnchorY - anchorY;
    Matter.Body.setPosition(cardBody, {
      x: cardBody.position.x + shiftX,
      y: cardBody.position.y + shiftY
    });
    Matter.Body.setVelocity(cardBody, { x: 0, y: 0 });
    
    width = newWidth;
    anchorX = newAnchorX;
    anchorY = newAnchorY;
    maxLaceLength = newLaceLength;
    cardConstraint.length = newLaceLength;
    
    cardConstraint.pointA.x = anchorX;
    cardConstraint.pointA.y = anchorY;
    
    const pr = window.devicePixelRatio || 1;
    render.options.width = width + OVERFLOW_PADDING_X * 2;
    render.canvas.width = (width + OVERFLOW_PADDING_X * 2) * pr;
    render.canvas.style.width = (width + OVERFLOW_PADDING_X * 2) + 'px';
    render.canvas.style.height = (container.clientHeight + OVERFLOW_PADDING_Y * 2) + 'px';

    const newScale = getContainerScale();
    mouse.scale = { x: 1 / newScale, y: 1 / newScale };
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".lace")?.classList.add("animate");
});
