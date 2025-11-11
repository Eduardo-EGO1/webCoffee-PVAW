

export async function getCafeList() {
  try {
    const res = await fetch("http://localhost:3000/cafe")
    if (!res.ok) throw new Error("Erro na requisição")
    const data = await res.json()

    return data;
  }
  catch (error) {
    console.error("Erro capturado", error)
  }
}

