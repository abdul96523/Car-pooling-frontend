import { createSlice } from "@reduxjs/toolkit";

const initialState: { name: string, id: number }[] = []

const locationReducer = createSlice(
    {
        name: "locations",
        initialState,
        reducers:
        {
            setLocationList: (state, action) => {
                action.payload.map((details: { name: string, id: number }) => {
                    // if (!state.includes(location.locationName.trim())) state.push(location.locationName.trim())
                    if (!state.some(d => d.name == details.name)) {
                        state.push(details)
                    }
                })
            },
            removeLocationsList: (state) => {
                return []
            }
        }
    }
)

export const { setLocationList, removeLocationsList } = locationReducer.actions;
export default locationReducer.reducer