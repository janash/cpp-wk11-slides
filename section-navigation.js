// Section Navigation System
class SectionNavigator {
  constructor() {
    this.sections = [];
    this.currentSection = 0;
    this.isOpen = false;
    this.initializeUI();
  }

  // Enhanced loadSections to track section boundaries
  async enhancedLoadSections(sections) {
    const slidesContainer = document.getElementById('slides');
    slidesContainer.innerHTML = '';
    
    this.sections = []; // Reset sections array
    let slideCount = 0;

    // Handle both old format (array of strings) and new format (array of objects)
    const normalizedSections = this.normalizeSections(sections);

    for (let i = 0; i < normalizedSections.length; i++) {
      const section = normalizedSections[i];
      const startSlide = slideCount;
      
      try {
        console.log(`Loading section: ${section.file}`);
        const response = await fetch(`sections/${section.file}.html`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const html = await response.text();
        slidesContainer.insertAdjacentHTML('beforeend', html);
        
        // Count slides in this section
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const slidesInSection = tempDiv.querySelectorAll('.slide').length;
        
        // Store section information
        this.sections.push({
          file: section.file,
          name: section.name,
          displayName: section.name,
          startSlide: startSlide,
          slideCount: slidesInSection
        });
        
        slideCount += slidesInSection;
        
        // Execute scripts in the loaded content
        const scripts = slidesContainer.querySelectorAll('script');
        scripts.forEach(script => {
          if (script.src) {
            const newScript = document.createElement('script');
            newScript.src = script.src;
            document.head.appendChild(newScript);
          } else {
            try {
              eval(script.textContent);
            } catch (error) {
              console.error(`Error executing script in ${section.file}:`, error);
            }
          }
        });
        
      } catch (error) {
        console.error(`Failed to load section: ${section.file}`, error);
        slidesContainer.insertAdjacentHTML('beforeend', 
          `<section class="slide">
            <div class="slide-body">
              <h2>Error loading section: ${section.file}</h2>
              <p>Check that sections/${section.file}.html exists</p>
            </div>
          </section>`
        );
        
        // Still track the error slide
        this.sections.push({
          file: section.file,
          name: section.name,
          displayName: section.name,
          startSlide: startSlide,
          slideCount: 1
        });
        slideCount += 1;
      }
    }
    
    // Update sidebar after loading
    this.updateSidebar();
    
    // Wait for everything to settle, then initialize
    setTimeout(() => {
      initializeSlides();
    }, 200);
  }

  // Convert old format to new format for backward compatibility
  normalizeSections(sections) {
    if (!Array.isArray(sections)) {
      throw new Error('Sections must be an array');
    }

    return sections.map(section => {
      if (typeof section === 'string') {
        // Old format: just filename, auto-generate display name
        return {
          file: section,
          name: this.formatSectionName(section)
        };
      } else if (typeof section === 'object' && section.file && section.name) {
        // New format: object with file and name
        return section;
      } else {
        throw new Error(`Invalid section format: ${JSON.stringify(section)}`);
      }
    });
  }

  formatSectionName(filename) {
    // Fallback function for auto-generating names from filenames
    const nameMap = {
      'title': 'Title',
      'outline': 'Course Outline', 
      'containers': 'Containers',
      'functions': 'Functions',
      'file-io': 'File I/O'
    };
    return nameMap[filename] || filename.charAt(0).toUpperCase() + filename.slice(1).replace('-', ' ');
  }

  initializeUI() {
    // Add hamburger button to nav
    this.addHamburgerButton();
    
    // Create sidebar
    this.createSidebar();
    
    // Track current section when navigating
    this.trackCurrentSection();
  }

  addHamburgerButton() {
    const nav = document.querySelector('.nav');
    
    // Wrap existing nav content in nav-right
    const existingContent = nav.innerHTML;
    nav.innerHTML = `
      <div class="nav-left">
        <button class="hamburger-menu" id="hamburgerBtn" title="Section Navigation">
          ☰
        </button>
      </div>
      <div class="nav-right" style="display: flex; align-items: center; gap: 10px;">
        ${existingContent}
      </div>
    `;
    
    // Add click handler
    document.getElementById('hamburgerBtn').addEventListener('click', () => {
      this.toggleSidebar();
    });
  }

  createSidebar() {
    // Create sidebar HTML
    const sidebarHTML = `
      <div class="sidebar-overlay" id="sidebarOverlay"></div>
      <div class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <h3 class="sidebar-title">Sections</h3>
          <button class="close-sidebar" id="closeSidebar">✕</button>
        </div>
        <div class="sidebar-content" id="sidebarContent">
          <!-- Sections will be populated here -->
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', sidebarHTML);
    
    // Add event listeners
    document.getElementById('closeSidebar').addEventListener('click', () => {
      this.closeSidebar();
    });
    
    document.getElementById('sidebarOverlay').addEventListener('click', () => {
      this.closeSidebar();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeSidebar();
      }
    });
  }

  updateSidebar() {
    const sidebarContent = document.getElementById('sidebarContent');
    if (!sidebarContent) return;
    
    sidebarContent.innerHTML = this.sections.map((section, index) => `
      <div class="section-item" data-section="${index}">
        <div>
          <div class="section-name">${section.displayName}</div>
          <div class="section-info">
            ${section.slideCount} slide${section.slideCount !== 1 ? 's' : ''} • 
            Starts at slide ${section.startSlide + 1}
          </div>
        </div>
      </div>
    `).join('');
    
    // Add click handlers
    sidebarContent.querySelectorAll('.section-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const sectionIndex = parseInt(e.currentTarget.dataset.section);
        this.jumpToSection(sectionIndex);
      });
    });
  }

  trackCurrentSection() {
    // Override the existing showSlide function to track current section
    const originalShowSlide = window.showSlide;
    
    window.showSlide = (index) => {
      // Call original function
      originalShowSlide(index);
      
      // Update current section
      this.updateCurrentSection(index);
    };
  }

  updateCurrentSection(slideIndex) {
    // Find which section contains this slide
    for (let i = this.sections.length - 1; i >= 0; i--) {
      if (slideIndex >= this.sections[i].startSlide) {
        this.currentSection = i;
        break;
      }
    }
    
    // Update sidebar highlighting
    document.querySelectorAll('.section-item').forEach((item, index) => {
      item.classList.toggle('current', index === this.currentSection);
    });
  }

  jumpToSection(sectionIndex) {
    if (sectionIndex >= 0 && sectionIndex < this.sections.length) {
      const section = this.sections[sectionIndex];
      
      // Use existing jumpToSlide function
      if (typeof jumpToSlide === 'function') {
        jumpToSlide(section.startSlide);
      } else {
        // Fallback to showSlide
        current = section.startSlide;
        showSlide(current);
      }
      
      this.closeSidebar();
    }
  }

  toggleSidebar() {
    if (this.isOpen) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }

  openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.add('open');
    overlay.classList.add('show');
    this.isOpen = true;
    
    // Update current section highlighting
    this.updateCurrentSection(current);
  }

  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    this.isOpen = false;
  }
}

// Initialize section navigator
const sectionNavigator = new SectionNavigator();

// Replace the existing loadSections function
window.loadSections = function(sections) {
  return sectionNavigator.enhancedLoadSections(sections);
};

// Make sectionNavigator globally available for debugging
window.sectionNavigator = sectionNavigator;