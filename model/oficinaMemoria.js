// vetor que armazena as oficinas em memoria (o catalogo comeca vazio)
const lista_oficinas = []

// proximo ID numerico que sera atribuido a uma nova oficina
var proximo_id = 1

class OficinaMemoria {
    // metodos assincronos para simular os metodos de um ORM

    // cria uma nova oficina, sempre com as inscricoes abertas
    async cria(titulo, responsavel, descricao, cargaHoraria) {
        var oficina = {
            id: proximo_id,
            titulo: titulo,
            responsavel: responsavel,
            descricao: descricao,
            cargaHoraria: cargaHoraria,
            inscricoesAbertas: true
        }
        proximo_id++
        lista_oficinas.push(oficina)
        return oficina
    }

    // retorna a oficina com o ID informado
    async consulta(id) {
        var oficinaEncontrada = lista_oficinas.find(function (oficina) {
            return oficina.id === id
        })
        if (oficinaEncontrada) {
            return oficinaEncontrada
        } else {
            throw new Error(`Oficina com o ID ${id} não existe`)
        }
    }

    // altera os dados da oficina, preservando o ID e a situacao das inscricoes
    async atualiza(id, titulo, responsavel, descricao, cargaHoraria) {
        var oficina = await this.consulta(id)
        oficina.titulo = titulo
        oficina.responsavel = responsavel
        oficina.descricao = descricao
        oficina.cargaHoraria = cargaHoraria
        return oficina
    }

    // alterna a situacao das inscricoes entre abertas e encerradas
    async alternaSituacao(id) {
        var oficina = await this.consulta(id)
        oficina.inscricoesAbertas = !oficina.inscricoesAbertas
        return oficina
    }

    // remove a oficina do catalogo
    async deleta(id) {
        var indice = lista_oficinas.findIndex(function (oficina) {
            return oficina.id === id
        })
        if (indice >= 0) {
            lista_oficinas.splice(indice, 1)
        } else {
            throw new Error(`Oficina com o ID ${id} não existe`)
        }
    }

    // retorna todas as oficinas cadastradas
    async lista() {
        return lista_oficinas
    }

    // retorna somente as oficinas com inscricoes abertas
    async listaAbertas() {
        return lista_oficinas.filter(function (oficina) {
            return oficina.inscricoesAbertas
        })
    }

    // retorna as oficinas cujo titulo contem o termo (sem diferenciar maiusculas de minusculas)
    async pesquisa(termo) {
        var termoMinusculo = termo.toLowerCase()
        return lista_oficinas.filter(function (oficina) {
            return oficina.titulo.toLowerCase().includes(termoMinusculo)
        })
    }

    // calcula os indicadores do resumo a partir das oficinas em memoria
    async resumo() {
        var abertas = 0
        var encerradas = 0
        var cargaHorariaAbertas = 0
        for (var oficina of lista_oficinas) {
            if (oficina.inscricoesAbertas) {
                abertas++
                cargaHorariaAbertas += oficina.cargaHoraria
            } else {
                encerradas++
            }
        }
        return {
            total: lista_oficinas.length,
            abertas: abertas,
            encerradas: encerradas,
            cargaHorariaAbertas: cargaHorariaAbertas
        }
    }
}

// cria um objeto do tipo OficinaMemoria que sera utilizado para gerenciar as oficinas
var oficinas = new OficinaMemoria()

module.exports = oficinas
