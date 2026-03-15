import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import { fetchCountries } from '../../../lib/api/countries'
import type { Country } from '../../../lib/types/country'
import type { RootState } from '../../../store'

interface CountriesState {
  items: Country[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: CountriesState = {
  items: [],
  status: 'idle',
}

export const loadCountries = createAsyncThunk('countries/fetchAll', () => fetchCountries())

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(loadCountries.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default countriesSlice.reducer

const selectCountriesState = (state: RootState) => state.countries
export const selectCountries = createSelector(selectCountriesState, (s) => s.items)
