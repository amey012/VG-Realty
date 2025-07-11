fetch("/content.json")
  .then((res) => res.json())
  .then((data) => {
    renderGlobal(data);
    const path = window.location.pathname;
    const Path = path.replace(/\/+$/, "");

    if (Path === "" || Path === "/index.html" || Path === "/") {
      renderHome(data);
    } else if (Path === "/about-us" || Path === "/about-us/index.html") {
      renderAboutUs(data);
    } else if (Path === "/properties" || Path === "/properties/index.html") {
      renderProperties(data);
      setupPropertyFilters(data);
    } else if (Path === "/contact-us" || Path === "/contact-us/index.html") {
      renderContactUs(data);
    } else if (Path === "/property-view" || Path === "/property-view/index.html") {
      renderPropertyView(data);
    }
  })
  .catch((err) => console.error("Failed to load content.json", err));

// Header & Footer
function renderGlobal(data) {
  const global = data.global;

  // Header
  document.querySelector(".logo").innerHTML = `
        <a href="${global.header.homeLink}">
          <img src="${global.header.logo}" alt="VG Realty Logo" width="120" height="auto">
        </a>
    `;
  document.querySelector(
    ".contact-btn"
  ).innerHTML = `<a href="${global.header.contactLink}">
        <img src="${global.header.contactIcon}" width="16"> ${global.header.contactButton}
        <img src="${global.header.contactArrow}" width="32"></a>
    `;
  document.querySelector(".nav-links").innerHTML = global.header.navLinks
    .map((link) => `<li><a href="${link.href}">${link.label}</a></li>`)
    .join("");

  // Contact
  document.querySelector(".contact-section-label").innerText =
    global.contact.label;
  document.querySelector(".contact-title").innerText = global.contact.title;
  document.querySelector(".contact-desc").innerText =
    global.contact.description;
  document.querySelector(".primary-button").innerText =
    global.contact.primaryButton;

  // Footer
  document.querySelector(".footer-phone").innerText = global.footer.phone;
  document.querySelector(".footer-email").innerText = global.footer.email;
  document.querySelector(
    ".footer-email"
  ).href = `mailto:${global.footer.email}`;
  document.querySelector(".footer-address").innerText = global.footer.address;
  document.querySelector(".footer-desc").innerText = global.footer.desc;
  document.querySelector(".footer-links-header").innerText =
    global.footer.navHeader;
  document.querySelector(
    ".footer-logo"
  ).innerHTML = `<img src="${global.footer.logo}" alt="VG Realty Logo" class="footer-logo" />`;
  document.querySelector(".footer-links").innerHTML = global.footer.navLinks
    .map((link) => `<li><a href="${link.href}">${link.label}</a></li>`)
    .join("");
  document.querySelector(".footer-socials").innerHTML = global.footer.socials
    .map(
      (s) => `<a href="${s.url}"><img src="${s.icon}" alt="${s.platform}"></a>`
    )
    .join("");

  document.querySelector(".footer-copy").innerText = global.footer.copyright;
  document.querySelector(".footer-dev").innerText = global.footer.developer;
}

// Home
function renderHome(data) {
  const home = data.home;
  // Hero
  document.querySelector(".hero-image").src = home.hero.image;
  document.querySelector(".explore-btn").innerHTML = `
    ${home.hero.exploreButton}
    <img src="${home.hero.contactArrow}" width="30">

    `;

  // Offer
  document.querySelector(".offer-label").innerText = home.offer.label;
  document.querySelector(".offer-image").src = home.offer.image;
  document.querySelector(".offer-title").innerText = home.offer.title;
  document.querySelector(".offer-desc").innerText = home.offer.description;
  document.querySelector(".offer-list").innerHTML = home.offer.items
    .map(
      (item) => `
          <div class="item">
            <img src="${item.icon}" width="48">
            <div>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </div>
          </div>`
    )
    .join("");

  // Services
  document.querySelector(".services-section-label").innerText =
    home.services.label;
  document.querySelector(".services-title").innerText = home.services.title;
  document.querySelector(".services-grid").innerHTML = home.services.items
    .map(
      (s) => `
        <div class="service">
          <img src="${s.icon}" width="48">
          <div>
            <h3>${s.title}</h3>
            <p>${s.text}</p>
          </div>
        </div>`
    )
    .join("");

  // Properties
  document.querySelector(".properties-section-label").innerText =
    home.propertiesSection.label;
  document.querySelector(".properties-title").innerText =
    home.propertiesSection.title;
  document.querySelector(".properties-grid").innerHTML = home.properties
    .map(
      (p) => `
        <div class="property-card">
          <div class="property-image">
            <img src="${p.image}">
            <span class="property-tag">${p.tag}</span>
          </div>
          <div class="property-info">
            <p class="location"><img src="/images/svg/location.svg" width="18"> ${p.location}</p>
            <h3>${p.name}</h3>
            <div class="price">${p.price}</div>
            <div class="details">
              <span><img src="/images/svg/beds.svg" width="20">${p.beds} Beds</span> |
              <span><img src="/images/svg/bathroom.svg" width="20">${p.baths} Baths</span> |
              <span><img src="/images/svg/scale.svg" width="20">${p.size}</span>
            </div>
          </div>
        </div>`
    )
    .join("");
  document.querySelector(
    ".view-all-text"
  ).innerHTML = `${home.propertiesSection.viewAllText} <img src="${home.propertiesSection.ArrowIcon}" alt="Arrow Icon" width="30">`;

  // About
  document.querySelector(".about-section-label").innerText = home.about.label;
  document.querySelector(".about-title").innerText = home.about.title;
  document.querySelectorAll(".about-text p")[0].innerText =
    home.about.paragraphs[0];
  document.querySelectorAll(".about-text p")[1].innerText =
    home.about.paragraphs[1];
  document.querySelector(".team").src = home.about.teamPhoto;
  document.querySelector(".stats").innerHTML = home.about.stats
    .map(
      (stat) => `
        <div class="stat">
          <strong>${stat.value}</strong>
          <span>${stat.label}</span>
        </div>`
    )
    .join("");
  document.querySelector(".about-vision").innerHTML = `
      <div class="about-vision-item"><h3><img src="${home.about.eyeIcon}" width="20"> Our Vision</h3><p>${home.about.vision}</p></div>
      <div class="about-vision-item"><h3><img src="${home.about.communityIcon}" width="20"> Our Mission</h3><p>${home.about.mission}</p></div>
      <div class="about-vision-item"><h3><img src="${home.about.goalIcon}" width="20"> Our Goals</h3><p>${home.about.goals}</p></div>`;

  // Testimonials
  document.querySelector(".testimonials-section-label").innerText =
    home.testimonialsSection.label;
  document.querySelector(".testimonials-title").innerHTML =
    home.testimonialsSection.title;
  document.querySelector(".testimonials-desc").innerText =
    home.testimonialsSection.description;
  document.querySelector(".testimonial-grid").innerHTML = home.testimonials
    .map((t) => {
      const stars = "★".repeat(t.stars) + "☆".repeat(5 - t.stars);
      return `
        <div class="testimonial-card">
          <div class="stars">${stars}</div>
          <div class="client-info">
            <img src="${t.image}">
            <div><strong>${t.name}</strong><div>${t.role}</div></div>
          </div>
          <p>${t.text}</p>
        </div>`;
    })
    .join("");
}

// About-Us

function renderAboutUs(data) {
  const aboutUs = data.aboutUs;
  // About
  document.querySelector(".aboutUs-section-label").innerText =
    aboutUs.about.label;
  document.querySelector(".aboutUs-title").innerText = aboutUs.about.title;
  document.querySelectorAll(".aboutUs-text p")[0].innerText =
    aboutUs.about.paragraphs[0];
  document.querySelectorAll(".aboutUs-text p")[1].innerText =
    aboutUs.about.paragraphs[1];
  document.querySelector(".team").src = aboutUs.about.teamPhoto;
  document.querySelector(".stats").innerHTML = aboutUs.about.stats
    .map(
      (stat) => `
        <div class="stat">
          <strong>${stat.value}</strong>
          <span>${stat.label}</span>
        </div>`
    )
    .join("");
  document.querySelector(".aboutUs-vision").innerHTML = `
      <div class="aboutUs-vision-item"><h3><img src="${aboutUs.about.visionIcon}" width="20"> ${aboutUs.about.subHeading1}</h3><p>${aboutUs.about.desc1}</p></div>
      <div class="aboutUs-vision-item"><h3><img src="${aboutUs.about.communityIcon}" width="20"> ${aboutUs.about.subHeading2}</h3><p>${aboutUs.about.desc2}</p></div>
      <div class="aboutUs-vision-item"><h3><img src="${aboutUs.about.goalIcon}" width="20">${aboutUs.about.subHeading3}</h3><p>${aboutUs.about.desc3}</p></div>`;

  //Partners

  document.querySelector(".partners-title").innerText = aboutUs.partners.title;
  document.querySelector(".partners-block").innerHTML = aboutUs.partners.logos
    .map((logo) => `<img src="${logo}" alt="Partner Logo">`)
    .join("");

  //Residences

  document.querySelector(".residences-label").innerText =
    aboutUs.residences.label;
  document.querySelector(".residences-title").innerText =
    aboutUs.residences.title;
  document.querySelector(".residences-description").innerText =
    aboutUs.residences.description;

  document.querySelector(".residences-feature-text").innerHTML = `
      <img src="${aboutUs.residences.luxuryIcon}" width="52">
      <h2>${aboutUs.residences.subtitle}</h2>
      <p>${aboutUs.residences.text}</p>
    `;
  document.querySelector(".residences-center").innerHTML = `
    <img class="residences-image" src="${aboutUs.residences.image}" alt="Residence Image">
    <div class="residences-strip">
      <div class="strip-number">${aboutUs.residences.number}</div>
      <div class="strip-text">${aboutUs.residences.subtitle}</div>      
    </div>
    `;
  document.querySelector(".residences-steps").innerHTML =
    aboutUs.residences.features
      .map(
        (f, i) => `
      <div class="step" data-index="${i + 2}">
        <div class="residences-strip-section">
            <div class="step-number"> ${f.number
              .toString()
              .padStart(2, "0")}</div>
            <div class="step-title">${f.title.toUpperCase()}</div>
        </div>
        <img class="step-img" src="${f.image}" alt="arrow">
      </div>
    `
      )
      .join("");

  // Services

  document.querySelector(".services-label").innerText = aboutUs.services.label;
  document.querySelector(".services-title").innerText = aboutUs.services.title;
  document.querySelector(".services-grid").innerHTML = aboutUs.services.items
    .map(
      (s) => `
        <div class="serviceAbout">
          <img src="${s.icon}" width="48">
          <div>
            <h3>${s.title}</h3>
            <p>${s.text}</p>
          </div>
        </div>`
    )
    .join("");

  // Process

  document.querySelector(".process-label").innerText = aboutUs.process.label;
  document.querySelector(".process-title").innerText = aboutUs.process.title;
  document.querySelector(".process-steps").innerHTML = aboutUs.process.items
    .map(
      (i) => `
        <div class="steps">
          <div class="process-description">
              <h3>Step / ${i.step} </h3>
              <li> ${i.title} </li>
              <div> ${i.text} </div>
          </div>
        </div>`
    )
    .join("");
  document.querySelector(".sticky-image-wrapper").innerHTML = `
    <img src="/images/process-steps.png" class="steps-image" alt="Process Image">
  `;

  // Agents

  document.querySelector(".agents-label").innerText = aboutUs.agents.label;
  document.querySelector(".agents-title").innerText = aboutUs.agents.title;
  document.querySelector(".agents-grid").innerHTML = aboutUs.agents.clients
    .map(
      (c) => `
        <div class="agents-card">
          <img class="agents-image" src="${c.image}" >
              <h3>${c.name} </h3>
              <div> ${c.role} </div>
        </div>`
    )
    .join("");
  document.querySelector(
    ".view-all-agents"
  ).innerHTML = `${aboutUs.agents.viewAllExpert} <img src="${aboutUs.agents.arrowIcon}" alt="Arrow Icon" width="30">`;

  // Testimonials

  document.querySelector(".testimonials-section-label").innerText =
    aboutUs.testimonialsSection.label;
  document.querySelector(".testimonials-title").innerHTML =
    aboutUs.testimonialsSection.title;
  document.querySelector(".testimonials-desc").innerText =
    aboutUs.testimonialsSection.description;
  document.querySelector(".testimonial-grid").innerHTML = aboutUs.testimonials
    .map((t) => {
      const stars = "★".repeat(t.stars) + "☆".repeat(5 - t.stars);
      return `
        <div class="testimonial-card">
          <div class="stars">${stars}</div>
          <div class="client-info">
            <img src="${t.image}">
            <div><strong>${t.name}</strong><div>${t.role}</div></div>
          </div>
          <p>${t.text}</p>
        </div>`;
    })
    .join("");
}

//Properties Page

function renderProperties(data, filteredProperties = null) {
  const propertiesData =
    filteredProperties || data.properties.exploreProperties;

  // ExploreProperties
  document.querySelector(".allProperties-label").innerText =
    data.properties.propertySection.label;
  document.querySelector(".allProperties-title").innerText =
    data.properties.propertySection.title;
  document.querySelector(".allProperties-grid").innerHTML = propertiesData
    .map(
      (p) => `
          <a class="allProperty-card" href="${p.href}">
            <div class="allProperty-image">
              <img src="${p.image}">
              <span class="allProperty-tag">${p.tag}</span>
            </div>
            <div class="allProperty-info">
              <p class="location"><img src="/images/svg/location.svg" width="18">  ${p.location}</p>
              <div class="allProperty-details">
                <h4>${p.name}</h4>
                <div class="price">${p.price}</div>
              </div>
              <div class="details">
                <span><img src="/images/svg/beds.svg" width="20">${p.beds} Beds</span> |
                <span><img src="/images/svg/bathroom.svg" width="20">${p.baths} Baths</span> |
                <span><img src="/images/svg/scale.svg" width="20">${p.size}</span>
              </div>
            </div>
          </a>`
    )
    .join("");
}

//PropertiesFilters

function setupPropertyFilters(data) {
  const props = data.properties.exploreProperties;
  const icons = data.properties.propertySection;

  const types = [...new Set(props.map((p) => p.type))];
  const locations = [...new Set(props.map((p) => p.state))];
  const property = [...new Set(props.map((p) => p.propertyType))];

  document.querySelector(".filters").innerHTML = `
    <div class="filter-block">
      <img src="${icons.locationIcon}" class="filter-icon" alt="Location Icon">
      <select class="filter-location" id="location">
        <option value="">Location</option>
        ${locations.map((l) => `<option value="${l}">${l}</option>`).join("")}
      </select>
    </div>

    <div class="filter-block">
      <img src="${icons.typeIcon}" class="filter-icon" alt="Type Icon">
      <select class="filter-type" id="type">
        <option value="">Type</option>
        ${types.map((t) => `<option value="${t}">${t}</option>`).join("")}
      </select>
    </div>

    <div class="filter-block">
      <img src="${icons.propertyIcon}" class="filter-icon" alt="Property Icon">
      <select class="filter-property" id="property">
        <option value="">Property</option>
        ${property.map((p) => `<option value="${p}">${p}</option>`).join("")}
      </select>
    </div>
  `;

  document
    .querySelector(".filter-type")
    .addEventListener("change", filterAndRender);
  document
    .querySelector(".filter-location")
    .addEventListener("change", filterAndRender);
  document
    .querySelector(".filter-property")
    .addEventListener("change", filterAndRender);

  function filterAndRender() {
    const selectedType = document.querySelector(".filter-type").value;
    const selectedLoc = document.querySelector(".filter-location").value;
    const selectedProp = document.querySelector(".filter-property").value;

    const filtered = props.filter((p) => {
      const locPart = p.location
        .split(",")
        [p.location.split(",").length - 2]?.trim();
      return (
        (selectedType === "" || p.type === selectedType) &&
        (selectedLoc === "" || p.state === selectedLoc) &&
        (selectedProp === "" || p.propertyType === selectedProp)
      );
    });

    renderProperties(data, filtered);
  }
}

// ContactUs

function renderContactUs(data) {
  const contactUs = data.contactUs;

  // ContactDetails
  document.querySelector(".contactDetails-label").innerText =
    contactUs.contactDetails.label;
  document.querySelector(".contactDetails-title").innerText =
    contactUs.contactDetails.title;
  document.querySelector(".contact-grid").innerHTML =
    contactUs.contactDetails.items
      .map(
        (d) => `
        <div class="contactInfo">
          <img src="${d.icon}" width="48">
          <div>
            <h3>${d.title}</h3>
            <p>${d.text}</p>
          </div>
        </div>`
      )
      .join("");

  document.querySelector(".map-wrapper").innerHTML = `
       <iframe 
        src="${contactUs.contactDetails.mapURL}" 
        width="100%" 
        height="350" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    `;
}

// Property-View

function renderPropertyView(data) {
  const view = data.propertyView;

  document.querySelector(".property-block").innerHTML = `
      <div class="gallery">
            <div class="mainImage">
              <img src="${
                view.mainImage
              }" class="mainImage" alt="Main Property Image">
            </div>
            <div class="property-gallery">
              ${view.gallery
                .map(
                  (img) => `
                <img src="${img}" class="property-thumbnail" alt="Gallery Image">
              `
                )
                .join("")}
            </div>
      </div>
        
      <div class="property-wrapper">
        <div class="property-main-content">
          <div class="property-title">${view.title}</div>
          <div class="property-location"><img src="/images/svg/location.svg" width="18">
          ${view.location}</div>

          <div class="property-details">
            ${view.details
              .map(
                (d) => `
              <div>
                <span><img src="/images/svg/beds.svg" width="20">${d.beds} Beds</span> |
                <span><img src="/images/svg/bathroom.svg" width="20">${d.parking} Parking</span> |
                <span><img src="/images/svg/scale.svg" width="20">${d.size}</span>
              </div>
            `
              )
              .join("")}
          </div>

          <div class="property-overview">
            <h2>${view.overviewTitle}</h2>
            <div>${view.overview}</div>
          </div>

          <div class="property-features-title">${view.featuresTitle}</div>
          <div class="property-features-list">  
              ${view.features
                .map(
                  (f) =>
                    `<div class="features-list"><img src="/images/svg/feature.svg">${f}</div>`
                )
                .join("")}
          </div>

          <div class="amenities-title">${view.amenitiesTitle}</div>
          <div class="amenities">
            ${view.amenities
              .map(
                (a) => `
              <span class="amenities-badge">
              <img src="${a.icon}" alt="${a.title}" width="16" height="16" style="margin-right: 4px;">${a.title}
              </span>
            `
              )
              .join("")}
          </div>

          <div class="map-title">${view.mapTitle}</div>
          <div class="map-location">
            <iframe 
              src="${view.mapLocation}" 
              width="700" 
              height="350" 
              style="border:0;" 
              allowfullscreen 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>

          <div class="video-title">${view.videoTitle}</div>
          <div class="property-video">
            <img src="${
              view.propertyVideo
            }" class="property-thumbnail" alt="Property Video Thumbnail">
          </div>
        </div>

        <div class="agent-card">
          <div class="agent-card-wrapper">
            <div class="agent-tag">${view.agentCard.tag}</div>
            <div class="agent-price">${view.agentCard.price}</div>
            <p class="agent-desc">${view.agentCard.desc}</p>
            <button class="agent-btn">Request Info</button>
            <div class="agent-divider">Reach the Agent</div>

            <div class="agent-profile">
              <img src="${
                view.agentCard.image
              }" class="agent-img" alt="Agent Image">
                <div>
                  <div class="agent-name">${view.agentCard.name}</div>
                  <div class="agent-role">${view.agentCard.role}</div>
                </div>
            </div>

            <div class="agent-contact">
              <div class="agent-mail"><img src="/images/svg/mail.svg" width="16"> ${
                view.agentCard.email
              }</div>
              <div class="agent-phone"><img src="/images/svg/phone.svg" width="16"> ${
                view.agentCard.phone
              }</div>
            </div>
          </div>
        </div>
      </div>

      <div class="browse-property"> 
          <h2 class="browse-property-title">${view.browsepropertyTitle}</h2>
          <div class="browse-grid">
            ${view.browseProperty
              .map(
                (b) => `
            <div class="browse-image">
              <img class="browse-img" src="${b.image}">
              <span class="browse-tag">${b.tag}</span>
                  
              <div class="browse-info">
                <p class="location"><img src="/images/svg/location.svg" width="18"> ${b.location}</p>
                <div class="browse-details">
                <h4>${b.name}</h4>
                <div class="price">${b.price}</div>
              </div>

              <div class="details">
                <span><img src="/images/svg/beds.svg" width="20">${b.beds} Beds</span> |
                <span><img src="/images/svg/bathroom.svg" width="20">${b.baths} Baths</span> |
                <span><img src="/images/svg/scale.svg" width="20">${b.size}</span>
              </div>
            </div>
          </div>
                `
              )
              .join("")}
      </div>
      `;
}
