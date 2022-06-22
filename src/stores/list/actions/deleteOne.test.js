import { describe, expect, test, vi } from 'vitest'
import { setActivePinia, createPinia, defineStore } from 'pinia'

import infiniteListState from '../state/infinite.js'

import createDeleteOne from './deleteOne.js'

describe('deleteOne', () => {
  describe('Errors', () => {
    test('Not found in the store', async () => {
      setActivePinia(createPinia())
      const mockConnector = vi.fn().mockImplementation((params, body) => JSON.parse(JSON.stringify((body))))
      const mockOnError = vi.fn()

      const useStore = defineStore('deleteOneTestList', {
        state: infiniteListState,
        actions: {
          deleteOne: createDeleteOne(mockConnector, mockOnError)
        }
      })

      const store = useStore()
      store.params = { param1: 'testparam', param2: 'testparam2' }
      store.items = [
        { _id: 1, status: 'ready', data: { _id: 1, name: 'first' }, errors: [] },
        { _id: 2, status: 'ready', data: { _id: 2, name: 'second' }, errors: [] },
        { _id: 3, status: 'ready', data: { _id: 3, name: 'third' }, errors: [] }
      ]

      expect(store.deleteOne(4)).rejects.toThrow(new Error('Item with _id: 4 was not found in the store.'))
      expect(mockOnError.mock.lastCall).toEqual([new Error('Item with _id: 4 was not found in the store.')])
      expect(store.status).toBe('encountered-an-error')
      expect(store.errors).toEqual([new Error('Item with _id: 4 was not found in the store.')])
    })

    test('Connector - pessimistic', async () => {
      setActivePinia(createPinia())
      const mockConnector = vi.fn().mockImplementation(async (params, body) => { throw new Error('mocked error') })
      const mockOnError = vi.fn()

      const useStore = defineStore('deleteOneTestList', {
        state: infiniteListState,
        actions: {
          deleteOne: createDeleteOne(mockConnector, mockOnError)
        }
      })

      const store = useStore()
      store.params = { param1: 'testparam', param2: 'testparam2' }
      store.items = [
        { _id: 1, status: 'ready', data: { _id: 1, name: 'first' }, errors: [] },
        { _id: 2, status: 'ready', data: { _id: 2, name: 'second' }, errors: [] },
        { _id: 3, status: 'ready', data: { _id: 3, name: 'third' }, errors: [] }
      ]

      const resultPromise = store.deleteOne(2)
      expect(store.items[1].status).toBe('delete-in-progress')
      expect(store.items[1].data.name).toBe('second')
      expect(mockConnector.mock.lastCall).toEqual([{ param1: 'testparam', param2: 'testparam2', id: 2 }])

      try {
        await resultPromise
      } catch (e) {
        expect(e).toEqual(new Error('mocked error'))
      }

      expect(store.items[1].data.name).toBe('second')
      expect(store.items[1].status).toBe('encountered-an-error')
      expect(mockOnError.mock.lastCall).toEqual([new Error('mocked error')])
      expect(store.items[1].errors).toEqual([new Error('mocked error')])
    })

    test('Connector - optimistic', async () => {
      setActivePinia(createPinia())
      const mockConnector = vi.fn().mockImplementation(async (params, body) => { throw new Error('mocked error') })
      const mockOnError = vi.fn()

      const useStore = defineStore('deleteOneTestList', {
        state: infiniteListState,
        actions: {
          deleteOne: createDeleteOne(mockConnector, mockOnError, { optimistic: true })
        }
      })

      const store = useStore()
      store.params = { param1: 'testparam', param2: 'testparam2' }
      store.items = [
        { _id: 1, status: 'ready', data: { _id: 1, name: 'first' }, errors: [] },
        { _id: 2, status: 'ready', data: { _id: 2, name: 'second' }, errors: [] },
        { _id: 3, status: 'ready', data: { _id: 3, name: 'third' }, errors: [] }
      ]

      const resultPromise = store.deleteOne(2)
      expect(store.items[1]._id).toBe(3)
      expect(mockConnector.mock.lastCall).toEqual([{ param1: 'testparam', param2: 'testparam2', id: 2 }])

      try {
        await resultPromise
      } catch (e) {
        expect(e).toEqual(new Error('mocked error'))
      }

      expect(store.items[1]._id).toBe(2)
      expect(store.items[1].status).toBe('encountered-an-error')
      expect(mockOnError.mock.lastCall).toEqual([new Error('mocked error')])
      expect(store.items[1].errors).toEqual([new Error('mocked error')])
    })
  })

  describe('Success', () => {
    test('Pessimistic', async () => {
      setActivePinia(createPinia())
      const mockConnector = vi.fn().mockImplementation((params, body) => ({ ...params }))

      const useStore = defineStore('deleteOneTestList', {
        state: infiniteListState,
        actions: {
          deleteOne: createDeleteOne(mockConnector)
        }
      })

      const store = useStore()
      store.params = { param1: 'testparam', param2: 'testparam2' }
      store.items = [
        { _id: 1, status: 'ready', data: { _id: 1, name: 'first' }, errors: [] },
        { _id: 2, status: 'ready', data: { _id: 2, name: 'second' }, errors: [] },
        { _id: 3, status: 'ready', data: { _id: 3, name: 'third' }, errors: [] }
      ]

      const resultPromise = store.deleteOne(2)
      expect(store.items[1].status).toBe('delete-in-progress')
      expect(store.items[1].data.name).toBe('second')

      const result = await resultPromise

      expect(mockConnector.mock.lastCall).toEqual([{ param1: 'testparam', param2: 'testparam2', id: 2 }])
      expect(store.items[1]._id).toBe(3)
      expect(result).toEqual({ param1: 'testparam', param2: 'testparam2', id: 2 })
    })

    test('Optimistic', async () => {
      setActivePinia(createPinia())
      const mockConnector = vi.fn().mockImplementation((params, body) => ({ ...params }))

      const useStore = defineStore('deleteOneTestList', {
        state: infiniteListState,
        actions: {
          deleteOne: createDeleteOne(mockConnector, () => {}, { optimistic: true })
        }
      })

      const store = useStore()
      store.params = { param1: 'testparam', param2: 'testparam2' }
      store.items = [
        { _id: 1, status: 'ready', data: { _id: 1, name: 'first' }, errors: [] },
        { _id: 2, status: 'ready', data: { _id: 2, name: 'second' }, errors: [] },
        { _id: 3, status: 'ready', data: { _id: 3, name: 'third' }, errors: [] }
      ]

      const resultPromise = store.deleteOne(2)
      expect(store.items[1]._id).toBe(3)

      const result = await resultPromise

      expect(mockConnector.mock.lastCall).toEqual([{ param1: 'testparam', param2: 'testparam2', id: 2 }])
      expect(store.items[1]._id).toBe(2)
      expect(result).toEqual({ param1: 'testparam', param2: 'testparam2', id: 2 })
    })
  })
})
