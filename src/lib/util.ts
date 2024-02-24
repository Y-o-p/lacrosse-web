export function toJson(object: any) {
    return JSON.stringify(object, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    );
}

export function getRandomCode(length: number) {
    return Array.from(
      { length: length },
      () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    ).join('');
  }