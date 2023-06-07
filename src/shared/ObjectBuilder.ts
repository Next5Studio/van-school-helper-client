interface ITrimmer<T extends Record<string, any> = Record<string, any>> {
    shouldTrim: (value: T) => boolean
    applyTrim: (obj: T, key: string) => void
}

class ObjectBuilder<T> {
    public static with<T>(obj: T) {
        return new ObjectBuilder<T>(obj)
    }

    private readonly properties: T

    private trimmers: ITrimmer[] = []

    private constructor(obj: T) {
        this.properties = obj
    }

    public addTrimmer(TrimmerConstructor: new () => ITrimmer) {
        this.trimmers.push(new TrimmerConstructor())
        return this
    }

    public trim(TrimmerConstructor: new () => ITrimmer) {
        const trimmer = new TrimmerConstructor()
        this.__trim(this.properties, [trimmer])
        return this
    }

    public build() {
        this.__trim(this.properties, this.trimmers)
        return this.properties
    }

    private __trim(obj: any, trimmers: ITrimmer[]) {
        // eslint-disable-next-line guard-for-in
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                this.__trim(obj[key], trimmers)
            }
            for (const trimmer of trimmers) {
                if (trimmer.shouldTrim(obj[key])) {
                    trimmer.applyTrim(obj, key)
                }
            }
        }
    }
}

export { ObjectBuilder }
export type { ITrimmer }
