from fastapi import FastAPI
from typing import List, Optional
from pydantic import BaseModel
from uuid import uuid4

app = FastAPI()

class Animal(BaseModel):
    id: Optional[int] = None
    nome: str
    idade: int
    sexo: str
    cor: str

banco: List[Animal] = []

@app.get("/")
def home():
    return {"message": "Tudo certo!!!"}

@app.get('/animais')
async def listar_animais():
    return banco

@app.post('/animais')
async def criar_animal(animal: Animal):
    if (animal.id == None):
        animal.id = uuid4().int
    banco.append(animal)
    return None

@app.get('/animais/{id}')
async def buscar_animal(id: int):
    for animal in banco:
        if animal.id == id:
            return animal
    return {"message": "Animal não encontrado"}

@app.delete('/animais/{id}')
async def remover_animal(id: int):
    for index, animal in enumerate(banco):
        if animal.id == id:
            del banco[index]
            return {"message": "Animal removido com sucesso"}
    else:
        return {"message": "Animal não encontrado"}
