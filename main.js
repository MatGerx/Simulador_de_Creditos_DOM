   
     //PLANES DISPONIBLES (ARRAY DE OBJETOS)
    const planes = [
    { cuotas: 3, interesMensual: 0.05 },
    { cuotas: 6, interesMensual: 0.08 },
    { cuotas: 12, interesMensual: 0.12 },
    ];
   
   
   //DEFINO LAS FUNCIONES  
     //Muestra los planes disponibles en consola
    function mostrarPlanesDisponibles(listaPlanes) {
    console.log("📌 Planes disponibles:");
    for (let i = 0; i < listaPlanes.length; i++) {
        console.log(
        `- Opción ${i + 1}: ${listaPlanes[i].cuotas} cuotas | Interés mensual: ${(listaPlanes[i].interesMensual * 100).toFixed(2)}%`
        );
    }
    }
    //valida si numero ingresado por el usuario 
    function pedirNumeroPositivo(mensaje) {

        //muestro mensaje 
        let ingreso = prompt(mensaje);

        // mientras no cancele y el valor sea inválido
        while (ingreso !== null) {
            //lo casteo
            const numero = Number(ingreso);

            if (Number.isFinite(numero) && numero > 0) {
            return numero; // válido → salgo
            }

            alert("⚠️ Tenés que ingresar un número válido mayor a 0.");
            ingreso = prompt(mensaje); // vuelvo a pedir
        }

        // si el usuario canceló
        return null;
    }

    //muestra los planes disponibles en el array y valida si hay un ingreso invalido 
    function elegirPlan(listaPlanes) {
    let opcion = null;

    while (opcion === null) {
        let mensaje = "Elegí un plan:\n";

        //el for recorre el array y va acumulando en la variable mensaje, los pares clave-valor, controlados con un salto de linea 
        for (let i = 0; i < listaPlanes.length; i++) {
        const plan = listaPlanes[i];
        mensaje += `${i + 1}) ${plan.cuotas} cuotas - ${(plan.interesMensual * 100).toFixed(2)}% mensual\n`;

        }

        const ingreso = prompt(mensaje);


        //si el usuario toca cancelar cuando esta elegiendo los planes, el codigo de abajo cancela la simulacion
        if (ingreso === null) return null;

        const numero = Number(ingreso);

        if (!Number.isInteger(numero) || numero < 1 || numero > listaPlanes.length) {
        alert("⚠️ Opción inválida. Elegí un número de la lista.");
        } else {
        opcion = numero;
        }
    }

    return listaPlanes[opcion - 1];
    }

    /** Calcula cuota mensual aproximada (simple) */
    function calcularCuota(monto, plan) {
    const interesTotal = monto * plan.interesMensual * plan.cuotas;
    const total = monto + interesTotal;
    const cuota = total / plan.cuotas;

    return {total,cuota,interesTotal,};
    }

    /** Formatea número a $ con 2 decimales */
    function formatoDinero(valor) {
    return `$ ${valor.toFixed(2)}`;
    }   







    //INICIA EL PROGRAMA CON LOS OUTPUTS 
    function iniciarSimulador() {
    alert("👋 Bienvenido al Simulador de Créditos");

    //caso true el programa continua 
    const quiere = confirm("¿Querés simular un crédito ahora?");
    if (!quiere) {
        alert("Listo. Cuando quieras, recargá la página 😉");
        console.log("El usuario decidió no iniciar el simulador.");
        return;
        }

    //se pide al usuario ingresar un monto llamando a la funcion
    const monto = pedirNumeroPositivo("Ingresá el monto del crédito (ej: 100000):");
    if (monto === null) {
        alert("Simulación cancelada.");
        console.log("Simulación cancelada en el ingreso del monto.");
        return;

    }
    //LLAMO A LA FUNCION, LE PASO POR ARGUMENTO LOS PLANES DEFINIDO EN EL ARRAY DE OBJETOS 
    mostrarPlanesDisponibles(planes);


    //el usario elegi un plan, llamamos al funcion elegirplanes()
        const planElegido = elegirPlan(planes);
    if (planElegido === null) {
        alert("Simulación cancelada.");
        console.log("Simulación cancelada en la elección del plan.");
        return;
    }

        const resultado = calcularCuota(monto, planElegido);

    // pasamos a la funcion formatoDinero() para dejarlo en 2 decimales y mostramos por pantalla 
    alert(
        `✅ Resultado de tu simulación:\n\n` +
        `Monto: ${formatoDinero(monto)}\n` +
        `Plan: ${planElegido.cuotas} cuotas\n` +
        `Interés mensual: ${(planElegido.interesMensual * 100).toFixed(2)}%\n\n` +
        `Interés total aprox: ${formatoDinero(resultado.interesTotal)}\n` +
        `Total a pagar aprox: ${formatoDinero(resultado.total)}\n` +
        `Cuota mensual aprox: ${formatoDinero(resultado.cuota)}`
    );

    //lo mostramos por la consola 
    console.log("Monto:", monto, "Plan:", planElegido, "Cuota:", resultado.cuota, "Total:", resultado.total, "Interés:", resultado.interesTotal);



    //volvemos a preguntar si el usuario quiere hace una nueva simulacion

    const otra = confirm("¿Querés hacer otra simulación?");
    if (otra) {
        iniciarSimulador(); // reutiliza funciones, sin DOM
    } else {
        alert("Gracias por usar el simulador 🙌");
        console.log("El usuario finalizó el simulador.");
    }



    }




    //llamado a la funcion para iniciar el programa 

    iniciarSimulador();