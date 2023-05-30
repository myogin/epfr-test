import { PersonalInformation } from "@/models/SectionOne"; 
import {create} from "zustand";

interface PersonalState {
  dataPersonal: PersonalInformation[];
  addData: (description: string) => void;
  removeData: (id: string) => void;
  toggleCompletedState: (id: string) => void;
}

export const useStore = create<PersonalState>((set) => ({
    // initial state
    dataPersonal: [],
    // methods for manipulating state
    addData: (description: string) => {
      set((state) => ({
        todos: [
          ...state.todos,
          {
            id: uuidv4(),
            description,
            completed: false,
          } as Todo,
        ],
      }));
    },
    removeData: (id) => {
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    },
    toggleCompletedState: (id) => {
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id
            ? ({ ...todo, completed: !todo.completed } as Todo)
            : todo
        ),
      }));
    },
  }));