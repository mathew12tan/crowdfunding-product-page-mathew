// show mobile menu
const navToggle = document.querySelector(".nav-toggle");
const navDesktop = document.querySelector(".nav-desktop");

navToggle.addEventListener("click", function () {
  navDesktop.classList.toggle("show-menu");
});

// bookmarked
const bookmark = document.querySelector(".bookmark-checkbox");
const bookmarkLabel = document.querySelector(".bookmark-label");
const bookmarkSpan = document.querySelector(".bookmark-label span");
bookmark.addEventListener("click", function () {
  let bookmarkStatus = bookmark.checked;
  bookmarkStatus
    ? (bookmarkLabel.classList.add("checked"),
      (bookmarkSpan.textContent = "Bookmarked"))
    : (bookmarkLabel.classList.remove("checked"),
      (bookmarkSpan.textContent = "Bookmark"));
});

const backProjectBtn = document.querySelector(".back-project-btn");
const closeModalBtn = document.querySelector(".close-modal-btn");
const selectionModal = document.querySelector(".selection-modal-overlay");

// toggle selection modal
backProjectBtn.addEventListener("click", function () {
  selectionModal.classList.add("show-selection-modal");
});

// pledge
const pledges = document.querySelectorAll(".pledge");
const successModal = document.querySelector(".success-modal-overlay");
const successBtn = document.querySelector(".success-btn");

pledges.forEach((pledge) => {
  // select individual pledge and show pledge value
  const selectPledge = pledge.querySelector(".select-pledge");
  selectPledge.addEventListener("click", function () {
    pledges.forEach((element) => {
      if (element !== pledge) {
        element.classList.remove("toggle-pledge");
      }
      pledge.classList.add("toggle-pledge");
    });
  });

  // select individual pledge when open selection modal
  const rewardSelections = document.querySelectorAll(".reward-selection");
  rewardSelections.forEach((rewardSelection) => {
    const rewardBtn = rewardSelection.querySelector(".reward-selection button");
    const rewardLeft = rewardSelection.querySelector(".reward-left span");
    rewardBtn.addEventListener("click", function () {
      selectionModal.classList.add("show-selection-modal");
      if (pledge.classList.contains(rewardLeft.className)) {
        pledge.classList.add("toggle-pledge");
        selectPledge.checked = true;
      }
    });

    // close selection modal and reset pledge
    closeModalBtn.addEventListener("click", function () {
      selectionModal.classList.remove("show-selection-modal");
      pledge.classList.remove("toggle-pledge");
      selectPledge.checked = false;
    });
  });

  let pledgeNumberLeft = parseInt(
    pledge.querySelector(".pledge-number-left").textContent
  );
  const pledgeSubmit = pledge.querySelector(".pledge-submit");
  pledgeSubmit.addEventListener("submit", function (e) {
    e.preventDefault();
    // update pledge count
    if (isNaN(pledgeNumberLeft)) {
      pledge.querySelector(".pledge-number-left").textContent = "";
    } else {
      pledgeNumberLeft -= 1;
      pledge.querySelector(".pledge-number-left").textContent =
        pledgeNumberLeft;
    }

    // update reward number
    const rewardSelections = document.querySelectorAll(".reward-selection");
    rewardSelections.forEach((rewardSelection) => {
      const rewardLeft = rewardSelection.querySelector(".reward-left span");
      if (pledge.classList.contains(rewardLeft.className)) {
        rewardLeft.textContent = pledgeNumberLeft;
      }
    });

    // disable reward button when reward count is 0
    rewardSelections.forEach((rewardSelection) => {
      const rewardBtn = rewardSelection.querySelector(
        ".reward-selection button"
      );
      const rewardLeft = rewardSelection.querySelector(".reward-left span");
      const reward = rewardSelection.parentElement;
      if (rewardLeft.textContent === "0") {
        rewardBtn.disabled = true;
        rewardBtn.textContent = "Out of Stock";
        reward.classList.add("disable-reward");
      }
    });

    // show success modal
    successModal.classList.add("show-success-modal");
    selectionModal.classList.remove("show-selection-modal");

    // reset pledge
    pledge.classList.remove("toggle-pledge");
    selectPledge.checked = false;

    // disable pledge when pledge count is 0
    if (pledgeNumberLeft === 0) {
      selectPledge.disabled = true;
      pledge.classList.add("disable-pledge");
    }

    // update total backers number
    let targetNumber = document.querySelector(".target-number h1").textContent;
    targetNumber = parseInt(targetNumber.replace(/,/g, ""));
    targetNumber += 1;
    document.querySelector(".target-number h1").textContent =
      targetNumber.toLocaleString();

    // update backed value and progress bar
    let pledgeInput = pledge.querySelector(".pledge-input input");
    let targetValue = document
      .querySelector(".target-value h1")
      .textContent.slice(1);
    let progress = document.querySelector("progress");

    if (pledgeInput !== null) {
      targetValue = parseInt(targetValue.replace(/,/g, ""));
      targetValue += parseInt(pledgeInput.value);
    } else {
      targetValue = parseInt(targetValue.replace(/,/g, ""));
    }

    document.querySelector(
      ".target-value h1"
    ).textContent = `$${targetValue.toLocaleString()}`;

    progress.value = (targetValue / 100000) * 100;
    if (progress.value === 100) {
      progress.classList.add("full");
    }
  });
});

// close success modal
successBtn.addEventListener("click", function () {
  successModal.classList.remove("show-success-modal");
});
