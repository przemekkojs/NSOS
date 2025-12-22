export const useInviteEmployeeTour = () => {
  const { t } = useI18n();
  return useTour({
    id: "invite-employee",
    steps: [
      {
        element: "a[href='']",
        // onHighlighted(element) {
        //   onHighlighted(element, driverObj);
        // },
        popover: {
          title: t("tours.inviteUsers.navigateToEmployees.title"),
          description: t("tours.inviteUsers.navigateToEmployees.description"),
          side: "right",
          //   onNextClick: onNextClick,
          //   onNextClick: () => {
          //     console.info("on next click");
          //   },
        },
      },
      {
        // element: "#invite-employee-button",
        // onHighlighted(element) {
        //   onHighlighted(element, driverObj);
        // },
        popover: {
          title: t("tours.inviteUsers.inviteNewEmployee.title"),
          description: t("tours.inviteUsers.inviteNewEmployee.description"),
          //   onNextClick: onNextClick,
        },
      },
      {
        // element: "#invite-employee-field",
        popover: {
          title: t("tours.inviteUsers.enterEmployeeEmail.title"),
          description: t("tours.inviteUsers.enterEmployeeEmail.description"),
          onPrevClick(_, __, { driver }) {
            const escapeEvent = new KeyboardEvent("keydown", {
              key: "Escape",
              code: "Escape",
              bubbles: true,
            });
            document.dispatchEvent(escapeEvent);
            driver.movePrevious();
          },
        },
      },
      {
        // element: "#invite-employee-field",
        popover: {
          title: t("tours.inviteUsers.enterAnotherEmployee.title"),
          description: t("tours.inviteUsers.enterAnotherEmployee.description"),
        },
      },
      {
        // element: "#send-invitation-button",
        popover: {
          title: t("tours.inviteUsers.sendInvitation.title"),
          description: t("tours.inviteUsers.sendInvitation.description"),
        },
      },
    ],
  });
};
