import { driver, type Driver, type DriverHook, type Popover } from "driver.js";

const NAVIGATION_TIMEOUT = 3000;
const CHECK_INTERVAL = 100;

function onHighlighted(element: Element | undefined, driverObj: Driver) {
  const nextIndex = driverObj.hasNextStep()
    ? driverObj.getActiveIndex()
    : undefined;

  const nextSelector = driverObj.getConfig().steps?.[nextIndex!]?.element;
  const nextElement =
    typeof nextSelector === "string"
      ? document.querySelector(nextSelector)
      : nextSelector instanceof Function
        ? nextSelector()
        : nextSelector;

  if (!nextElement) {
    return;
  }

  const clickHandler = () => {
    element?.removeEventListener("click", clickHandler);

    if (element instanceof HTMLAnchorElement) {
      element?.click();
    }

    // Wait for the next element to exist before moving next
    const checkElement = setInterval(() => {
      if (nextElement) {
        clearInterval(checkElement);
        driverObj.moveNext();
      }
    }, CHECK_INTERVAL);

    // Timeout to prevent infinite waiting
    setTimeout(() => clearInterval(checkElement), NAVIGATION_TIMEOUT);
  };
  element?.addEventListener("click", clickHandler);
}

const onNextClick: DriverHook = (element, _, options) => {
  if (options.state.activeIndex === undefined) {
    return;
  }

  if (element instanceof HTMLAnchorElement) {
    element?.click();
  } else if (element instanceof HTMLButtonElement) {
    element?.click();
  }
};

/**
 *
 * TODO: more tours
 * - CRUD user
 *
 * - CRUD position (teacher)
 *
 * - CRUD students to courses
 *
 * - CRUD institution
 *
 * - CRUD course
 *
 * - harmonogram
 * - optimize something
 * - explain statistics
 * - onboarding
 */
export const useTour = () => {
  const { t } = useI18n();

  const popoverBase: Partial<Popover> = {
    side: "bottom",
    align: "start",
    nextBtnText: t("button.next"),
    prevBtnText: t("button.previous"),
    doneBtnText: t("button.done"),
  };

  const driverObj = driver({
    showProgress: true,
    popoverClass: "driverjs-theme",
    steps: [
      {
        element: "a[href='/employees']",
        onHighlighted(element) {
          onHighlighted(element, driverObj);
        },
        popover: {
          ...popoverBase,
          title: t("tours.inviteUsers.navigateToEmployees.title"),
          // title: "ABC",
          description: t("tours.inviteUsers.navigateToEmployees.description"),
          side: "right",
          onNextClick: onNextClick,
        },
      },
      {
        element: "#invite-employee-button",
        onHighlighted(element) {
          onHighlighted(element, driverObj);
        },
        popover: {
          ...popoverBase,
          title: t("tours.inviteUsers.inviteNewEmployee.title"),
          description: t("tours.inviteUsers.inviteNewEmployee.description"),
          onNextClick: onNextClick,
        },
      },
      {
        element: "#invite-employee-field",
        popover: {
          ...popoverBase,
          title: t("tours.inviteUsers.enterEmployeeEmail.title"),
          description: t("tours.inviteUsers.enterEmployeeEmail.description"),
          onPrevClick() {
            const escapeEvent = new KeyboardEvent("keydown", {
              key: "Escape",
              code: "Escape",
              bubbles: true,
            });
            document.dispatchEvent(escapeEvent);
            driverObj.movePrevious();
          },
        },
      },
      {
        element: "#invite-employee-field",
        popover: {
          ...popoverBase,
          title: t("tours.inviteUsers.enterAnotherEmployee.title"),
          description: t("tours.inviteUsers.enterAnotherEmployee.description"),
          onPopoverRender(popover, opts) {},
        },
      },
      {
        element: "#send-invitation-button",
        popover: {
          ...popoverBase,
          title: t("tours.inviteUsers.sendInvitation.title"),
          description: t("tours.inviteUsers.sendInvitation.description"),
        },
      },
    ],
  });

  return driverObj;
};
