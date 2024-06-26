//bottom button scroll up
document.documentElement.addEventListener("click", function (e) {
  let target = e.target;
  while (target != document.documentElement) {
    if (target.matches(".mtc_bottom_buton")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      break;
    }
    target = target.parentNode;
  }
});

//---------------------------------------------------------------------
//reveal script
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight * 1.2;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);

//---------------------------------------------------------------------

function scroll_to_div(to_where) {
  document
    .getElementById(to_where)
    .scrollIntoView({ behavior: "smooth", block: "center" });
}

//---------------------------------------------------------------------

function popoup(id) {
  target1 = document.getElementById("mtc_popup_block_" + id);
  if (target1.style.display == "none") {
    target1.style.display = "flex";
  } else {
    target1.style.display = "none";
  }
}

function qa(id) {
  console.log("aaaa");
  target2 = document.querySelector(
    "#mtc_qa_block_" + id + " .mtc_qa_block_bottom"
  );
  target3 = document.querySelector(
    "#mtc_qa_block_" + id + " .mtc_qa_block_svg"
  );
  target4 = document.querySelector(
    "#mtc_qa_block_" + id + " .mtc_qa_block_top"
  );
  target5 = document.querySelector(
    "#mtc_qa_block_" + id + " .mtc_qa_block_top .mtc_qa_block_svg_path"
  );

  if (target2.style.display == "none") {
    target2.style.display = "flex";
    target3.style.transform = "rotate(180deg)";
    target4.classList.add("mtc_qa_block_top_active");
    target5.classList.add("mtc_qa_block_svg_path_active");
  } else {
    target2.style.display = "none";
    target3.style.transform = "rotate(0deg)";
    target4.classList.remove("mtc_qa_block_top_active");
    target5.classList.remove("mtc_qa_block_svg_path_active");
  }
}

//---------------------------------------------------------------------
//mtc footer config
function set_footer() {
  var mtc_footer_buttons = JSON.parse(
    localStorage.getItem("mtc_footer_buttons")
  );
  document.getElementById("mtc_footer_contacte").innerHTML =
    mtc_footer_buttons[0];
  document.getElementById("mtc_footer_magazine").innerHTML =
    mtc_footer_buttons[1];
  document.getElementById("mtc_footer_licitații").innerHTML =
    mtc_footer_buttons[2];

  var mtc_footer = JSON.parse(localStorage.getItem("mtc_footer"));
  var footer_content = "";

  mtc_footer.forEach((item) => {
    footer_content += '<div class="mtc_footer_content_column">';
    footer_content +=
      '<div class="mtc_footer_content_title">' + item.name + "</div>";
    if (item.children) {
      item.children.forEach((child) => {
        footer_content +=
          '<a class="mtc_footer_content_list" href="' +
          child.link +
          '"">' +
          child.name +
          "</a>";
      });
    }
    footer_content += "</div>";
  });
  document.getElementById("mtc_footer_content").innerHTML = footer_content;
}

//---------------------------------------------------------------------
//hide
function hideElements(elements) {
  elements.forEach((element) => {
    element.style.display = "none";
  });
}
//---------------------------------------------------------------------

// Function to set the footer content and apply necessary DOM manipulations
function hideoldfooter() {
  const footerElement = document.getElementById("mtc_footer");
  if (footerElement) {
    // Hide elements only if footer is successfully updated
    const footerHolders = document.querySelectorAll(".footer_holder");
    const backTopContainers = document.querySelectorAll(".back_top_container");
    hideElements(footerHolders);
    hideElements(backTopContainers);
  }
}

// Insert the loading animation div as the first element of the body
function insertLoadingDiv() {
  const div = document.createElement("div");
  div.id = "mtc_loadingAnimationSVG";
  div.innerHTML =
    '<img alt="loading" src="https://www.moldtelecom.md/new/images/general/logo/loading.png">';
  document.body.insertBefore(div, document.body.firstChild);
}

//---------------------------------------------------------------------

//seting the mtc-footer to auto-load
document.addEventListener("DOMContentLoaded", function () {
  console.log("[DEV] : MTC WebKit used");

  // Insert the loading animation div
  insertLoadingDiv();

  //---------------------------------------------------------------------

  fetch("../webkit/new/html/footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footerElement = document.getElementById("mtc_footer");
      // Check if the element exists
      if (footerElement) {
        footerElement.innerHTML = data;
        set_footer();
        hideoldfooter();
      }
    });

  // Element to update based on the language preference
  const footer_text = document.getElementById("mtc_footer_text");

  // Check if the element exists
  if (footer_text) {
    footer_text_ro =
      "Stimate client, Moldtelecom.md face eforturi permanente pentru a păstra acuratețea informațiilor din acest site. Cu toate acestea, rareori, informațiile plasate pe site pot conține inadvertențe punctuale, cum ar fi: unele specificații sau prețuri pot fi modificate de către producător, fără preaviz sau pot conține erori de operare. În cazul în care prețurile sau alte detalii referitoare la produse au fost afișate greșit, inclusiv din cauza faptului că au fost introduse greșit în baza de date, www.moldtelecom.md, S. A „Moldtelecom” își rezervă dreptul de a anula comercializarea produsului respectiv și de a anunța clientul în cel mai scurt timp despre eroarea aparută. Îți mulțumim pentru înțelegere.";
    footer_text_ru =
      'Уважаемый клиент, Moldtelecom.md прилагает постоянные усилия для обеспечения точности информации на этом сайте. Однако, в редких случаях, информация, размещенная на сайте может содержать точечные неточности, такие как: некоторые характеристики или цены могут быть изменены производителем без предварительного уведомления или могут содержать операционные ошибки. В случае, если цены или другие данные, относящиеся к продуктам, были отображены неправильно, в том числе из-за того, что они были неправильно введены в базу данных, www.moldtelecom.md, S.A „Moldtelecom" оставляет за собой право отменить продажу соответствующих продуктов и как можно скорее уведомить клиента о возникшей ошибке. Спасибо за понимание.';
    // Update the element's content based on the language preference
    // Use '===' for strict equality check
    if (lang === "ro") {
      footer_text.innerText = footer_text_ro;
    } else if (lang === "ru") {
      footer_text.innerText = footer_text_ru;
    } else {
      // Optional: Handle other languages or set a default text
      footer_text.innerText = "Default Text"; // Example default text
    }
  }
  fetch("../webkit/new/html/call_"+lang+".html")
  .then((response) => response.text())
  .then((data) => {
    const mtc_tv_call = document.getElementById("mtc_tv_call");
    // Check if the element exists
    if (mtc_tv_call) {
      mtc_tv_call.innerHTML = data;
    }
  });


  fetch("../webkit/new/html/tv_options_"+lang+".html")
  .then((response) => response.text())
  .then((data) => {
    const mtc_tv_options = document.getElementById("mtc_tv_options");
    // Check if the element exists
    if (mtc_tv_options) {
      mtc_tv_options.innerHTML = data;
      initializeSlickCarousel_tv();
    }
  });

  fetch("../webkit/new/html/myapp_"+lang+".html")
  .then((response) => response.text())
  .then((data) => {
    const mtc_mtc_app = document.getElementById("mtc_mtc_app");
    // Check if the element exists
    if (mtc_mtc_app) {
      mtc_mtc_app.innerHTML = data;
    }
  });


  fetch("../webkit/new/html/funtions_options_"+lang+".html")
  .then((response) => response.text())
  .then((data) => {
    const mtc_tv_functions = document.getElementById("mtc_tv_functions");
    // Check if the element exists
    if (mtc_tv_functions) {
      mtc_tv_functions.innerHTML = data;
      initializeSlickCarousel_funtions();
    }
  });

  fetch("../webkit/new/html/tm_options_"+lang+".html")
  .then((response) => response.text())
  .then((data) => {
    const mtc_tm_options = document.getElementById("mtc_tm_options");
    // Check if the element exists
    if (mtc_tm_options) {
      mtc_tm_options.innerHTML = data;
      initializeSlickCarousel_tm();
    }
  });


});

//---------------------------------------------------------------------

function redirectToPage(redirectToPageLink) {
  // Create and show the loading overlay
  var overlay = document.createElement("div");
  overlay.className = "loading-overlay";
  var spinner = document.createElement("div");
  spinner.className = "loading-spinner";
  overlay.appendChild(spinner);
  document.body.appendChild(overlay);
  overlay.style.display = "flex";

  // Redirect immediately
  window.location = redirectToPageLink;
}

function redirectToPageSVG(redirectToPageLinkSVG) {
  // Show the loading animation
  var mtc_loadingAnimationSVG = document.getElementById(
    "mtc_loadingAnimationSVG"
  );
  mtc_loadingAnimationSVG.style.display = "flex";

  // Redirect immediately
  window.location = redirectToPageLinkSVG;
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent the form from submitting immediately

  // Show the loading animation
  var mtc_loadingAnimationSVG = document.getElementById(
    "mtc_loadingAnimationSVG"
  );
  mtc_loadingAnimationSVG.style.display = "flex";

  // Optionally, use AJAX here to submit the form data without redirecting
  setTimeout(() => {
    event.target.submit(); // This is where you'd replace with AJAX if not redirecting
  }, 1000); // Adjust delay as needed
}

// Add event listener to the form
document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector(".mtc_form");
  if (form) {
    form.addEventListener("submit", handleFormSubmission);
  }
});

function initializeSlickCarousel_tv() {
  var carousel = $('.carousell_tv_options');
  if (carousel.length) { // Checks if the element exists
      carousel.slick({

    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1351,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 951,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 651,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
} else {
    console.error('Carousel element not found');
}
}


function initializeSlickCarousel_funtions() {
  var carousel = $('.carousell_tv_functions');
  if (carousel.length) { // Checks if the element exists
      carousel.slick({

    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1351,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 951,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 651,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
} else {
    console.error('Carousel element not found');
}
}

function initializeSlickCarousel_tm() {
  var carousel = $('.carousell_tm_options');
  if (carousel.length) { // Checks if the element exists
      carousel.slick({

    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1351,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 951,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 651,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
} else {
    console.error('Carousel element not found');
}
}