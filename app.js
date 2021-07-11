const navToggle = document.querySelector(".nav-toggle");
const navDesktop = document.querySelector(".nav-desktop");

const bookmark = document.querySelector(".bookmark-checkbox");
const bookmarkLabel = document.querySelector(".bookmark-label");
const bookmarkSpan = document.querySelector(".bookmark-label span");

const backProjectBtn = document.querySelector(".back-project-btn");
const selectionModal = document.querySelector(".selection-modal-overlay");
const closeModalBtn = document.querySelector(".close-modal-btn");

const pledges = document.querySelectorAll(".pledge");

const successModal = document.querySelector(".success-modal-overlay");
const successBtn = document.querySelector(".success-btn");

// show mobile menu
navToggle.addEventListener("click", function () {
  navDesktop.classList.toggle("show-menu");
});

// bookmarked
bookmark.addEventListener("click", function () {
  let bookmarkStatus = bookmark.checked;
  bookmarkStatus
    ? (bookmarkLabel.classList.add("checked"),
      (bookmarkSpan.textContent = "Bookmarked"))
    : (bookmarkLabel.classList.remove("checked"),
      (bookmarkSpan.textContent = "Bookmark"));
});

// toggle selection modal
backProjectBtn.addEventListener("click", function () {
  selectionModal.classList.add("show-selection-modal");
  let position = selectionModal.offsetTop + 160;
  selectionModal.scrollTo({ top: position, left: 0, behavior: "smooth" });
});

pledges.forEach((pledge) => {
  const rewardSelections = document.querySelectorAll(".reward-selection");
  const selectPledge = pledge.querySelector(".select-pledge");
  const pledgeSubmit = pledge.querySelector(".pledge-submit");

  // select individual pledge and show pledge value
  selectPledge.addEventListener("click", function () {
    pledges.forEach((element) => {
      if (element !== pledge) {
        element.classList.remove("toggle-pledge");
      }
      pledge.classList.add("toggle-pledge");
    });
  });

  // select individual pledge when open selection modal
  rewardSelections.forEach((rewardSelection) => {
    const rewardBtn = rewardSelection.querySelector(".reward-selection button");
    const rewardLeft = rewardSelection.querySelector(".reward-left span");
    rewardBtn.addEventListener("click", function () {
      selectionModal.classList.add("show-selection-modal");
      if (pledge.classList.contains(rewardLeft.className)) {
        pledge.classList.add("toggle-pledge");
        selectPledge.checked = true;
        let position = pledge.offsetTop - 150;
        selectionModal.scrollTo({ top: position, left: 0, behavior: "smooth" });
      }
    });
  });

  let pledgeNumberLeft = parseInt(
    pledge.querySelector(".pledge-number-left").textContent
  );
  pledgeSubmit.addEventListener("submit", function (e) {
    e.preventDefault();

    if (isNaN(pledgeNumberLeft)) {
      pledge.querySelector(".pledge-number-left").textContent = "";
    } else {
      pledgeNumberLeft -= 1;
      pledge.querySelector(".pledge-number-left").textContent = pledgeNumberLeft;
    }

    rewardSelections.forEach((rewardSelection) => {
      const reward = rewardSelection.parentElement;
      const rewardLeft = rewardSelection.querySelector(".reward-left span");
      const rewardBtn = rewardSelection.querySelector(".reward-selection button");

      // reduce pledge count
      if (pledge.classList.contains(rewardLeft.className)) {
        rewardLeft.textContent = pledgeNumberLeft;
      }

      // disable reward button when reward count is 0
      if (rewardLeft.textContent === "0") {
        rewardBtn.disabled = true;
        rewardBtn.textContent = "Out of Stock";
        reward.classList.add("disable-reward");
      }
    });

    // reset pledge
    pledge.classList.remove("toggle-pledge");
    selectPledge.checked = false;

    // disable pledge when pledge count is 0
    if (pledgeNumberLeft === 0) {
      selectPledge.disabled = true;
      pledge.classList.add("disable-pledge");
    }

    const pledgeInput = pledge.querySelector(".pledge-input input");
    let targetNumber = document.querySelector(".target-number h1").textContent;
    let targetValue = document.querySelector(".target-value h1").textContent.slice(1);
    let progress = document.querySelector("progress");

    // update total backers number
    targetNumber = parseInt(targetNumber.replace(/,/g, ""));
    targetNumber += 1;
    document.querySelector(".target-number h1").textContent = targetNumber.toLocaleString();

    // update backed value
    if (pledgeInput !== null) {
      targetValue = parseInt(targetValue.replace(/,/g, ""));
      targetValue += parseInt(pledgeInput.value);
    } else {
      targetValue = parseInt(targetValue.replace(/,/g, ""));
    }
    document.querySelector(".target-value h1").textContent = `$${targetValue.toLocaleString()}`;

    // update progress bar
    progress.value = (targetValue / 100000) * 100;
    if (progress.value === 100) {
      progress.classList.add("full");
    }

    // show success modal
    successModal.classList.add("show-success-modal");
    selectionModal.classList.remove("show-selection-modal");
  });

  // close selection modal and reset pledge
  closeModalBtn.addEventListener("click", function () {
    selectionModal.classList.remove("show-selection-modal");
    pledge.classList.remove("toggle-pledge");
    selectPledge.checked = false;
    pledgeSubmit.reset();
  });

  //reset input value
  pledgeSubmit.reset();
});

// close success modal
successBtn.addEventListener("click", function () {
  successModal.classList.remove("show-success-modal");
});
