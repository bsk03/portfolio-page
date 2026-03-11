import { create } from 'zustand'

interface MobileHeaderStore {
  isMenuOpen: boolean
  setIsMenuOpen: (isMenuOpen: boolean) => void
}

export const useMobileHeaderStore = create<MobileHeaderStore>((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen: boolean) =>
    set((state) => {
      // Zapobiega niepotrzebnym aktualizacjom jeśli stan się nie zmienia
      if (state.isMenuOpen === isMenuOpen) {
        return state
      }
      return { isMenuOpen }
    }),
}))

