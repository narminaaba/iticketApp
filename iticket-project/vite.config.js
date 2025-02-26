import { defineConfig } from "vite";
export default defineConfig({

  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        login: "login.html",
        register: "register.html",
        user: "user.html",
        events: "events.html",
        eventDetails: "eventDetails.html",
        adminpage: "adminpage.html",
      },
    },
  },
});