class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    isAprovado() {
        if (this.notaFinal >= 7) {
            return true;
        }

        else {
            return false;
        }
    }

    toString() {
        const status = this.isAprovado() ? "Aprovado" : "Reprovado";

        return `--- Dados do Aluno ---
        Nome: ${this.nome}
        Idade: ${this.idade} anos
        Curso: ${this.curso}
        Nota Final: ${this.notaFinal.toFixed(1).replace('.', ',')}
        Status: ${status}`;
    }


}

console.log('Funcionando!');

class AlunoController {
    constructor() {
        this.alunos = []; //inicializa um array vazio para armazenar alunos 
        this.init();
    }

    //adiciona evento no button para cadastrar - arrow function
    init() {
        document.getElementById('btnCadastrar').addEventListener('click', (e) => this.cadastrarAluno(e));
        document.getElementById('btnExcluir').addEventListener('click', (e) => this.excluirAluno(e));
        document.getElementById('btnEditar').addEventListener('click', (e) => this.editarAluno(e));
        document.getElementById('btnGerarRelatorio').addEventListener('click', (e) => this.gerarRelatorio(e));
    }


    //cadastra um aluno na lista 
    cadastrarAluno(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const idade = parseInt(document.getElementById('idade').value);
        const curso = document.getElementById('curso').value;
        const notaFinal = parseFloat(document.getElementById('notaFinal').value);

        if (notaFinal < 0 || notaFinal > 10) {
            alert(`Nota final inválida.Digite um valor entre 0 e 10`);
            return;
        }

        if (!nome || isNaN(idade) || !curso || isNaN(notaFinal)) {
            alert(`Preencha os campos corretamente!`);
            return;
        }

        if (nome || idade || curso || notaFinal) {
            const confirmar = confirm('Deseja salvar esse aluno(a)?');

            if (confirmar) {
                console.log(`Aluno(a) salvado com sucesso!`);

                const aluno = new Aluno(nome, idade, curso, notaFinal);

                this.alunos.push(aluno); //pega as info e imprime na tabela 
                this.atualizarTabela(); // atualiza a tabela com nova lista de alunos
                this.limparFormulario(); // limpa os campos de formulário

                console.log(aluno.toString());
            }

            else {
                console.log(`Ação cancelada.`);
                return;
            }
        }

    }

    editarAluno(event) {
        const row = event.target.closest('tr'); //obtém a linha da tabela onde o botão foi clicado
        const index = row.rowIndex - 1;
        const aluno = this.alunos[index];

        document.getElementById('nome').value = aluno.nome;
        document.getElementById('idade').value = aluno.idade;
        document.getElementById('curso').value = aluno.curso;
        document.getElementById('notaFinal').value = aluno.notaFinal;

        if (nome || idade || curso || notaFinal) {
            const confirmar = confirm('Deseja editar esse aluno(a)?');

            if (confirmar) {
                console.log(`Aluno(a) editado com sucesso!`);

                this.alunos.splice(index, 1); //remove aluno da lista
                this.atualizarTabela(); // atualiza a tabela com a nova lista de alunos
            }

            else {
                console.log(`Ação cancelada.`);
                return;
            }
        }
    }


    excluirAluno(e) {

        const confirmar = confirm(`Deseja excluir esse aluno(a) ? `);

        if (confirmar) {
            console.log(`Aluno(a) excluído com sucesso!`);

            e.preventDefault();
            const row = e.target.closest('tr');
            const index = row.rowIndex - 1;

            this.alunos.splice(index, 1);
            this.atualizarTabela();

        }

        else {
            console.log(`Ação cancelada.`);
            return;
        }
    }

    atualizarTabela() {
        const tabela = document.getElementById('tabela');
        tabela.innerHTML = '';
        this.alunos.forEach((aluno, index) => { //repete a linha de cada aluno no seu indice 
            const row = tabela.insertRow();
            row.insertCell(0).innerText = index + 1;
            row.insertCell(1).innerText = aluno.nome;
            row.insertCell(2).innerText = aluno.idade;
            row.insertCell(3).innerText = aluno.curso;
            row.insertCell(4).innerText = aluno.notaFinal;
            const status = row.insertCell(5);

            if (aluno.isAprovado()) {
                status.innerText = "APROVADO!";
            }

            else {
                status.innerText = "REPROVADO";
            }

            const btnEditar = document.createElement('button');
            btnEditar.innerText = 'Editar';
            btnEditar.type = 'button'

            const btnExcluir = document.createElement('button');
            btnExcluir.innerText = 'Excluir';
            btnExcluir.type = 'button'

            //cria uma célula para os botões 
            const actionCell = row.insertCell(6);

            //adiciona o botão de editar e excluir na célula
            actionCell.appendChild(btnEditar);
            actionCell.appendChild(btnExcluir);
            actionCell.style.display = 'flex';
            actionCell.style.gap = '5px';


            btnEditar.addEventListener('click', (event) => this.editarAluno(event));
            btnExcluir.addEventListener('click', (event) => this.excluirAluno(event));

        });

    }

    limparFormulario() {
        document.getElementById('nome').value = '';
        document.getElementById('idade').value = '';
        document.getElementById('curso').value = '';
        document.getElementById('notaFinal').value = '';


    }
    listarAprovados() {
        return this.alunos.filter(aluno => aluno.isAprovado()); // filtra e lista os alunos aprovados 

    }

    exibeMediaNotas() {

        if (this.alunos.length == 0) {
            return 0;
        }
        else {
            const somaNotas = this.alunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0);
            return (somaNotas / this.alunos.length).toFixed(2);
        }
    }

    exibeMediaIdades() {
        if (this.alunos.length == 0) {
            return 0;
        }
        else {
            const somaIdade = this.alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
            return (somaIdade / this.alunos.length).toFixed(1);
        }

    }

    nomesOrdenados() {
        const nomes = this.alunos.map(aluno => aluno.nome);
        return nomes.sort();
    }

    contarPorCurso() {

        return this.alunos.reduce((contagem, aluno) => {
            const nomeCurso = aluno.curso;
            contagem[nomeCurso] = (contagem[nomeCurso] || 0) + 1;

            return contagem;
        }, {});
    }

gerarRelatorio() {
    const mediaNotas = this.exibeMediaNotas();
    document.getElementById('mediaNotas').textContent = `Média: ${mediaNotas}`;


    const mediaIdade = this.exibeMediaIdades();
    document.getElementById('mediaIdades').textContent = `Média: ${mediaIdade} anos`;

    const listaNomes = document.getElementById('nomesOrdenados');
    listaNomes.innerHTML = ''; 

    const nomesOrdenados = this.nomesOrdenados();
    nomesOrdenados.forEach(nome => {
        const item = document.createElement('li');
        item.textContent = nome;
        listaNomes.appendChild(item);
    });

    const listaContagem = document.getElementById('contagemCurso');
    listaContagem.innerHTML = ''; // Limpa a lista
    
    const contagemCursos = this.contarPorCurso();
    for (const curso in contagemCursos) {
        if (contagemCursos.hasOwnProperty(curso)) {
            const item = document.createElement('li');
            item.textContent = `${curso}: ${contagemCursos[curso]} aluno(s)`;
            listaContagem.appendChild(item);
        }
    }

    const listaAprovados = document.getElementById('Aprovados');
    listaAprovados.innerHTML = ''
    
    const aprovados = this.listarAprovados();
    
    if (aprovados.length === 0) {
        listaAprovados.textContent = 'Nenhum aluno aprovado até o momento.';
    } else {
        aprovados.forEach(aluno => {
            const item = document.createElement('li');
            item.textContent = `${aluno.nome} - Nota: ${aluno.notaFinal.toFixed(1).replace('.', ',')}`;
            listaAprovados.appendChild(item);
        });
    }

    console.log("Relatórios atualizados com sucesso!");

}
}


document.addEventListener('DOMContentLoaded', () => {
    new AlunoController();
});