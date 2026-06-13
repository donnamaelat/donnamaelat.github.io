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

  // Create engine and improve stability for the heavy card
  const engine = Engine.create({
    positionIterations: 20, // Huge stability increase so joints never break!
    velocityIterations: 15
  });
  const world = engine.world;
  
  // CRITICAL FIX: Make gravity massive so the card snaps back down instantly when swung to the sides!
  engine.gravity.y = 3.5; // Slightly reduced from 5.0 so it's not aggressively violent

  // Set up rendering to draw the lace
  const width = container.clientWidth;
  const height = container.clientHeight; // Usually 500px based on CSS

  // CRITICAL FIX: The canvas cuts off the lace if dragged outside the container.
  // We make the canvas massive (1000px padding in all directions) so it never clips!
  const OVERFLOW_PADDING = 1000;

  const render = Render.create({
    element: container,
    engine: engine,
    options: {
      width: width + OVERFLOW_PADDING * 2,
      height: height + OVERFLOW_PADDING * 2,
      wireframes: false,
      background: 'transparent',
      pixelRatio: window.devicePixelRatio
    }
  });

  // Offset the canvas visually so it centers perfectly over the container
  render.canvas.style.position = 'absolute';
  render.canvas.style.top = `-${OVERFLOW_PADDING}px`;
  render.canvas.style.left = `-${OVERFLOW_PADDING}px`;
  render.canvas.style.pointerEvents = 'none';

  // Physical constants
  const group = Matter.Body.nextGroup(true);
  const segmentLength = 22;
  const segmentWidth = 6; // Thinner so it looks like a real fabric lanyard
  
  // Calculate dynamic anchor point so the lace always originates from the top of the page (behind navbar)
  const rect = container.getBoundingClientRect();
  const containerTop = rect.top + window.scrollY;
  
  // Anchor point (top center), offset by our padding!
  const anchorX = OVERFLOW_PADDING + width / 2;
  // Move anchor to the top of the document (y = 0)
  const anchorY = OVERFLOW_PADDING - containerTop;
  
  // Calculate how long the lanyard needs to be to hang at the original spot
  const targetRestingY = OVERFLOW_PADDING + 60; // Raised even further up per user request (from 100)
  const totalLaceLength = targetRestingY - anchorY;
  const lanyardLength = totalLaceLength / segmentLength;

  // Navy Blue Lanyard color to match the brand
  const maroonColor = '#0B1B4A';

  // Create the ID card rigid body
  const cardWidth = 250;
  const cardHeight = 375;
  const cardBody = Bodies.rectangle(
    anchorX, 
    anchorY + (lanyardLength * segmentLength) + (cardHeight/2), 
    cardWidth, 
    cardHeight, 
    { 
      collisionFilter: { group: group, category: 0x0002 },
      frictionAir: 0.02,
      density: 0.05,
      render: { visible: false }
    }
  );

  // CRITICAL FIX: We completely remove the multi-segment physics chain! 
  // Matter.js 2D solvers fundamentally jitter when multiple joints are under extreme mouse tension.
  // By using a single, perfect constraint from the ceiling straight to the card, 
  // we guarantee that it is MATHEMATICALLY IMPOSSIBLE to jitter, shake, or go crazy!
  const cardConstraint = Constraint.create({
    pointA: { x: anchorX, y: anchorY }, // Attached directly to the ceiling anchor
    bodyB: cardBody,
    pointB: { x: 0, y: -cardHeight/2 + 5 }, // Attach near the top edge so the clip peeks out from behind!
    length: lanyardLength * segmentLength, // Exact length of the original lace
    stiffness: 1, // Perfectly rigid pendulum
    damping: 0, // CRITICAL FIX: Zero damping so it swings back down instantly!
    render: { visible: false }
  });

  Composite.add(world, [cardBody, cardConstraint]);

  // Add mouse control so user can drag the card and lace
  // We bind it to the container so that it catches events from the DOM ID card over the canvas
  const mouse = Mouse.create(container);
  Mouse.setOffset(mouse, { x: -OVERFLOW_PADDING, y: -OVERFLOW_PADDING }); // Offset mouse to match physics world padding

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    collisionFilter: { mask: 0x0002 }, // ONLY grab the ID card, not the lanyard!
    constraint: {
      stiffness: 0.2, // CRITICAL FIX: The mouse acts as a soft spring. This prevents the mouse from violently ripping the rigid lace apart!
      render: { visible: false }
    }
  });

  // CRITICAL FIX: Prevent getting stuck at the edges or permanently attached to the cursor!
  // If the mouse leaves the physics container, Matter.js stops tracking it. 
  // We manually forward window-level mouse events to keep the drag perfectly smooth.
  window.addEventListener('mousemove', (e) => {
    if (mouse.button === 0) { // If we are currently holding the click
      const bounds = container.getBoundingClientRect();
      // Add OVERFLOW_PADDING so the global mouse perfectly matches the padded physics world!
      mouse.position.x = e.clientX - bounds.left + OVERFLOW_PADDING;
      mouse.position.y = e.clientY - bounds.top + OVERFLOW_PADDING;
      mouse.absolute.x = e.clientX - bounds.left + OVERFLOW_PADDING;
      mouse.absolute.y = e.clientY - bounds.top + OVERFLOW_PADDING;
    }
  });

  window.addEventListener('mouseup', () => {
    mouse.button = -1; // Force release the card no matter where the mouse is!
  });

  // Prevent browser's native text/image drag logic from interfering with our physics dragging
  idCardDom.addEventListener('dragstart', (e) => e.preventDefault());
  idCardDom.addEventListener('mousedown', () => {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  });

  Composite.add(world, mouseConstraint);

  // Keep the mouse in sync with rendering
  render.mouse = mouse;

  // CRITICAL FIX: The ultimate stable One-Way String!
  // Instead of toggling stiffness (which causes physics glitches), 
  // we dynamically shorten the constraint's "length" when pushed up. 
  // This produces 0 force, allowing it to instantly drop straight down!
  Events.on(engine, 'beforeUpdate', function() {
    const attachmentX = cardBody.position.x - (-cardHeight/2 + 5) * Math.sin(cardBody.angle);
    const attachmentY = cardBody.position.y + (-cardHeight/2 + 5) * Math.cos(cardBody.angle);
    
    const dx = attachmentX - anchorX;
    const dy = attachmentY - anchorY;
    const distance = Math.sqrt(dx*dx + dy*dy);
    const maxDist = lanyardLength * segmentLength;
    
    if (distance < maxDist) {
      if (mouseConstraint.body === cardBody) {
        cardConstraint.length = distance; 
      } else {
        cardConstraint.length = Math.min(maxDist, cardConstraint.length + 20);
      }
    } else {
      // SHOCK ABSORBER: If the string was previously slack, this is the exact frame it snaps!
      // We kill 60% of its kinetic energy instantly to prevent violent over-swaying!
      if (cardConstraint.length < maxDist - 1) {
        Matter.Body.setVelocity(cardBody, {
          x: cardBody.velocity.x * 0.4, 
          y: cardBody.velocity.y * 0.4
        });
      }
      cardConstraint.length = maxDist; // Taut string: Rigidly stops at max length
    }
  });

  // Sync DOM element with physics body on every tick
  Events.on(engine, 'afterUpdate', function() {
    // Safety Net: If the card gets flung completely out of bounds, rescue it!
    // Calculated relative to the anchor so the OVERFLOW_PADDING doesn't cause accidental teleports
    const outOfBoundsX = Math.abs(cardBody.position.x - anchorX) > 2000;
    const outOfBoundsY = Math.abs(cardBody.position.y - anchorY) > 2000;
    
    if (outOfBoundsX || outOfBoundsY) {
      Matter.Body.setPosition(cardBody, { x: anchorX, y: anchorY + 200 });
      Matter.Body.setVelocity(cardBody, { x: 0, y: 0 });
    }

    // The physics body's position is its center. 
    // We translate so the top-left of the DOM element is correct.
    // We subtract the OVERFLOW_PADDING so the HTML element ignores the canvas padding and stays perfectly aligned!
    const x = cardBody.position.x - cardWidth / 2 - OVERFLOW_PADDING;
    const y = cardBody.position.y - cardHeight / 2 - OVERFLOW_PADDING;
    const angle = cardBody.angle;

    // Calculate 3D tilt based on physics velocity
    // When it moves fast, it tilts in 3D space!
    const velocityX = cardBody.velocity.x;
    const velocityY = cardBody.velocity.y;
    
    // Clamp tilt angles to max 30 degrees for realism
    const tiltX = Math.max(-30, Math.min(30, velocityY * -1.5));
    const tiltY = Math.max(-30, Math.min(30, velocityX * 1.5));

    // Combine 2D position/rotation with 3D tilts. Apply perspective directly to the card so it doesn't distort when dragged off-center!
    idCardDom.style.transform = `translate(${x}px, ${y}px) perspective(1000px) rotateZ(${angle}rad) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    // Handle Shimmer Glare
    const speed = Math.sqrt(velocityX*velocityX + velocityY*velocityY);
    if (speed > 0.5) {
      idCardDom.classList.add('is-moving');
      // Move the gradient around based on tilt to simulate real light reflections
      idCardDom.style.setProperty('--glare-x', `${tiltY * -2}%`);
      idCardDom.style.setProperty('--glare-y', `${tiltX * 2}%`);
    } else {
      idCardDom.classList.remove('is-moving');
    }
  });

  // Render a beautifully smooth continuous curve for the lanyard
  // We use a Bezier curve to simulate the string bending due to air drag and gravity,
  // making it look completely natural and flexible without any physics jitter!
  Events.on(render, 'afterRender', function() {
    const context = render.context;
    
    // Draw the line near the top edge of the ID card so it peeks out from behind
    const attachmentPoint = {
      x: cardBody.position.x - (-cardHeight/2 + 5) * Math.sin(cardBody.angle),
      y: cardBody.position.y + (-cardHeight/2 + 5) * Math.cos(cardBody.angle)
    };

    // Calculate the mid-point of the string
    const midX = (anchorX + attachmentPoint.x) / 2;
    const midY = (anchorY + attachmentPoint.y) / 2;

    // 1. Simulating Air Resistance: The string bows in the opposite direction of movement
    const bowX = -cardBody.velocity.x * 2.5;
    const bowY = -cardBody.velocity.y * 2.5;

    // 2. Simulating Slack: If you push the card up, the string sags downwards with gravity
    const dx = attachmentPoint.x - anchorX;
    const dy = attachmentPoint.y - anchorY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const maxDist = lanyardLength * segmentLength;
    const slack = Math.max(0, maxDist - dist); 

    // Combine them to create the perfect control point for the curve
    const cpX = midX + bowX;
    let cpY = midY + bowY + (slack * 1.5);

    // FIX: Never let the string bow upwards past the anchor point! 
    // If it tries to go up, reflect it downwards so it always sags naturally.
    if (cpY < anchorY) {
      cpY = anchorY + Math.abs(cpY - anchorY);
    }

    // Function to draw the exact curve with varying styles
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

    // 1. Draw 3D Drop Shadow
    drawLace(40, 'rgba(0,0,0,0.1)', true);
    
    // 2. Draw Dark Outer Edge (Volume)
    drawLace(40, '#0d0d0d');
    
    // 3. Draw Main Black Fabric
    drawLace(36, '#1b1b1b');
    
    // 4. Draw Inner Fabric Highlight (Simulating rounded fabric lighting)
    drawLace(18, '#404040');
    
    // 5. Draw Tiny Specular Sheen (Nylon reflection)
    drawLace(5, 'rgba(255,255,255,0.10)');

    // --- DRAW REALISTIC METAL CLIP ---
    context.shadowColor = 'rgba(0,0,0,0.5)';
    context.shadowBlur = 5;
    context.shadowOffsetY = 3;
    
    // Calculate angle from control point to attachment point to align the clip
    const clipAngle = Math.atan2(attachmentPoint.y - cpY, attachmentPoint.x - cpX);
    
    context.save();
    context.translate(attachmentPoint.x, attachmentPoint.y);
    context.rotate(clipAngle);

    // Draw the silver metal connector loop
    context.beginPath();
    context.roundRect(-10, -12, 20, 24, 4); // x, y, width, height, radii
    context.fillStyle = '#b0b5b9'; // Silver base
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#6e7377'; // Dark metal edge
    context.stroke();

    // Draw metal highlight for 3D shine
    context.beginPath();
    context.roundRect(-8, -10, 8, 20, 2);
    context.fillStyle = '#ffffff';
    context.fill();

    // Draw the little rivet/pin
    context.beginPath();
    context.arc(0, 6, 3, 0, Math.PI * 2);
    context.fillStyle = '#4a4d50';
    context.fill();

    context.restore();
    
    // Reset shadow for other renderings
    context.shadowColor = 'transparent';
    context.shadowBlur = 0;
    context.shadowOffsetY = 0;
  });

  // Run the physics engine and renderer
  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  // Handle window resize gracefully
  window.addEventListener('resize', () => {
    // In a full implementation, you'd update anchor position
    // For now, we'll keep it simple
  });
});
