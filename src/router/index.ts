import { createRouter, createWebHistory } from "vue-router";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import { useTransitionStore } from "@/stores/transition";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    const transitionStore = useTransitionStore();
    const delay = transitionStore.transitionDelay;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0 });
        transitionStore.transitionDelay = 0;
      }, delay);
    });
    // return { top: 0 };
  },
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      components: {
        Navigation,
        MainContent: () => import("@/views/404View.vue"),
        Footer
      }
    },
    {
      path: "/",
      name: "splashPage",
      components: { FullPage: () => import("@/views/SplashPage.vue") }
    },
    {
      path: "/select",
      name: "select",
      components: {
        FullPage: () => import("@/views/SelectView.vue"),
        Footer
      }
    },
    {
      path: "/fingering-table",
      name: "fingeringTable",
      components: {
        Navigation,
        MainContent: () => import("@/views/FingeringTableView.vue"),
        Footer
      }
    },
    {
      path: "/guessing-game",
      name: "guessingGame",
      components: {
        Navigation,
        MainContent: () => import("@/views/GuessingGameView.vue"),
        Footer
      }
    },
    {
      path: "/mix-or-match",
      name: "mixOrMatch",
      components: {
        Navigation,
        MainContent: () => import("@/views/MixOrMatchView.vue"),
        Footer
      }
    },
    {
      path: "/about",
      name: "about",
      components: {
        Navigation,
        MainContent: () => import("@/views/AboutView.vue"),
        Footer
      }
    }
  ]
});

export default router;
