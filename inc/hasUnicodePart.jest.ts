import punycode from 'punycode/'
import { hasUnicodePart } from './hasUnicodePart'


describe('hasUnicodePart function', () => {
    it('returns false for ASCII-only domains', () => {
        expect(hasUnicodePart('example.com')).toBe(false)
    })

    it('returns true when the domain contains unicode characters', () => {
        expect(hasUnicodePart('mañana.com')).toBe(true)
    })

    it('returns false if punycode conversion throws', () => {
        const spy = jest.spyOn(punycode, 'toASCII').mockImplementation(() => {
            throw new Error('conversion error')
        })

        try {
            expect(hasUnicodePart('test-domain')).toBe(false)
            expect(spy).toHaveBeenCalledWith('test-domain')
        } finally {
            spy.mockRestore()
        }
    })
})
