import { driver, type Config, type DriverHook, type Popover } from "driver.js";

const NAVIGATION_TIMEOUT = 3000;
const CHECK_INTERVAL = 100;

const onHighlighted: DriverHook = (element, _, { driver: driverObj }) => {
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
};

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
 * - CRUD university
 *
 * - CRUD course
 *
 * - harmonogram
 * - optimize something
 * - explain statistics
 * - onboarding
 */
type TourId = "invite-employee";

/**
 * Remember to add "data-tour" and "data-tour-step" attributes to step elements
 * or override manually
 *
 * data-tour is one of TourId
 * data-tour-step is step index
 */
export const useTour = (options: Config & { id: TourId }) => {
  const { id, ...config } = options;

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
    steps: config?.steps?.map((step) => {
      const abc = {
        // element: `[data-tour="${id}"][data-tour-step="${index + 1}"]`,
        // element: `[data-tour-step='${id}-${index + 1}']`,
        element: 'a[href="/employees"]',
        onHighlighted,
        ...step,
        popover: {
          ...popoverBase,
          onNextClick,
          ...step.popover,
        },
      };

      console.info("abc", abc);
      console.info(document.querySelector(abc.element.toString()));

      return abc;
    }),
    ...config,
  });

  return driverObj;
};
