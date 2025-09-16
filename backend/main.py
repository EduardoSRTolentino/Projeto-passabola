from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict

# Modelos Pydantic para validação de dados
class JogadoraBase(BaseModel):
    nome: str
    posicao: str
    email: str
    idade: int

class TimeBase(BaseModel):
    nome: str

class CampeonatoBase(BaseModel):
    nome: str
    local: str
    data: str

class UsuarioLogin(BaseModel):
    email: str
    senha: str

class UsuarioCadastro(BaseModel):
    email: str
    senha: str
    nome: str

# Classes de dados do seu sistema original (adaptadas)
class Jogadora:
    def __init__(self, nome: str, posicao: str, email: str, idade: int) -> None:
        self.nome: str = nome
        self.posicao: str = posicao
        self.email: str = email
        self.idade: int = idade

class Time:
    def __init__(self, nome: str) -> None:
        self.nome: str = nome
        self.jogadoras: List[Jogadora] = []

class Campeonato:
    def __init__(self, nome: str, local: str, data: str) -> None:
        self.nome: str = nome
        self.local: str = local
        self.data: str = data
        self.times: List[Time] = []

class Sistema:
    def __init__(self) -> None:
        self.usuarios: Dict[str, dict] = {} # {email: {senha: "...", nome: "..."}}
        self.jogadoras: Dict[str, Jogadora] = {}
        self.campeonatos: Dict[str, Campeonato] = {}

    def get_campeonatos(self):
        return list(self.campeonatos.values())

# Simulação de "banco de dados" em memória
db = Sistema()
db.usuarios = {
    "exemplo@email.com": {"senha": "senha123", "nome": "Usuário Exemplo"}
}
db.campeonatos["campeonato1"] = Campeonato("Copa Feminina", "São Paulo", "20/10/2025")
time1 = Time("Time A")
time1.jogadoras.append(Jogadora("Ana", "atacante", "ana@email.com", 25))
time1.jogadoras.append(Jogadora("Beatriz", "defensora", "bea@email.com", 24))
db.campeonatos["campeonato1"].times.append(time1)

app = FastAPI()

# Configuração do CORS para permitir que o frontend se comunique com o backend
origins = [
    "http://localhost:5173",  # Adicione aqui o endereço do seu frontend
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoints da API
@app.post("/api/login")
def login(user_data: UsuarioLogin):
    user = db.usuarios.get(user_data.email)
    if not user or user["senha"] != user_data.senha:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos.")
    return {"message": "Login bem-sucedido!", "user": {"email": user_data.email, "nome": user["nome"]}}

@app.post("/api/register")
def register(user_data: UsuarioCadastro):
    if user_data.email in db.usuarios:
        raise HTTPException(status_code=400, detail="Email já cadastrado.")
    db.usuarios[user_data.email] = {"senha": user_data.senha, "nome": user_data.nome}
    return {"message": "Cadastro realizado com sucesso!"}

@app.get("/api/campeonatos")
def get_campeonatos():
    campeonatos_list = []
    for camp_id, camp in db.campeonatos.items():
        times_list = []
        for time in camp.times:
            jogadoras_list = [j.__dict__ for j in time.jogadoras]
            times_list.append({"nome": time.nome, "jogadoras": jogadoras_list})
        campeonatos_list.append({
            "id": camp_id,
            "nome": camp.nome,
            "local": camp.local,
            "data": camp.data,
            "times": times_list
        })
    return {"campeonatos": campeonatos_list}

@app.get("/api/users/{email}")
def get_user_data(email: str):
    user = db.usuarios.get(email)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    return {"nome": user["nome"], "email": email}

# Para rodar o servidor, execute no terminal:
# uvicorn backend:app --reload