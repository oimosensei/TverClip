import { create } from 'zustand'

type EditedTask = {
  id: number
  title: string
  description: string
  url : string
}

type State = {
  editedTask: EditedTask
  updateEditedTask: (payload: EditedTask) => void
  resetEditedTask: () => void
}

const useStore = create<State>((set) => ({
  editedTask: { id: 0, title: '' , description: '', url: ''},
  updateEditedTask: (payload) =>
    set({
      editedTask: payload,
    }),
  resetEditedTask: () => set({ editedTask: { id: 0, title: '',description:'',url:''} }),
}))

export default useStore
