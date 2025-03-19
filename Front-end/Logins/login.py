from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Página de login
@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        
        # Lógica para verificar usuário e senha
        if username == "admin" and password == "1234":
            return redirect(url_for("welcome"))
        else:
            return "Credenciais inválidas. Tente novamente."

    return render_template("loginAluno.html")

# Página de boas-vindas após o login
@app.route("/welcome")
def welcome():
    return "Bem-vindo ao sistema!"

if __name__ == "__main__":
    app.run(debug=True)