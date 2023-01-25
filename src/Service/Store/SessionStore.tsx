import produce from "immer";
import { create } from "zustand";
import sagaMiddleware from "zustand-saga";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import MMKVStoragePersistHelper from "../Helper/MMKVManager";
import root from "../Sagas";

const login = (store) => {
    store.setState(produce((state) => {
        state.isLogin = true;
    }))
}

const logout = (store) => {
    store.setState(produce((state) => {
        state.isLogin = false
    }))
}

export const useSessionStore = create(
    persist(
        sagaMiddleware(
            root,
            immer((get, set, store) => ({
                isLogin: false,
                login: () => login(store),
                logout: () => logout(store),
            }))
        ),
        {
           name: 'Session',
           version: 1,
           storage: createJSONStorage(() => new MMKVStoragePersistHelper('Session')),
        }
    )
)