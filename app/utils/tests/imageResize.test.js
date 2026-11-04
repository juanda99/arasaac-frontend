import { resizeImage, resizeImages } from '../imageResize'

describe('imageResize utility', () => {
  it('should return empty array for empty or non-array input', async () => {
    expect(await resizeImages([])).toEqual([])
    expect(await resizeImages(null)).toEqual([])
    expect(await resizeImages(undefined)).toEqual([])
  })

  it('should return original file if not an image or is SVG', async () => {
    const textFile = { name: 'doc.txt', type: 'text/plain', size: 100 }
    expect(await resizeImage(textFile)).toBe(textFile)

    const svgFile = { name: 'icon.svg', type: 'image/svg+xml', size: 200 }
    expect(await resizeImage(svgFile)).toBe(svgFile)
  })

  it('should handle array of files with resizeImages', async () => {
    const file1 = { name: '1.txt', type: 'text/plain', size: 10 }
    const file2 = { name: '2.txt', type: 'text/plain', size: 20 }
    const res = await resizeImages([file1, file2])
    expect(res).toEqual([file1, file2])
  })
})
