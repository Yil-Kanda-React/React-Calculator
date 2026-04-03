# 🧮 React Calculator

Una calculadora interactiva y moderna desarrollada con **React** y **TypeScript**, que ofrece una interfaz intuitiva y funcionalidades avanzadas de cálculo con un diseño elegante.

## 🌟 Características

* ✅ **Operaciones aritméticas completas**: Suma, resta, multiplicación y división.
* ✅ **Soporte para decimales**: Realiza cálculos con precisión de punto flotante.
* ✅ **Funciones especiales**:
    * Cambio de signo (±) para valores positivos/negativos.
    * Cálculo de porcentajes (%).
    * Borrar último dígito (Backspace).
    * Limpiar pantalla (C).
* ✅ **Atajos de teclado**: Soporte nativo para una experiencia de usuario rápida.
* ✅ **Gestión de errores**: Detección y manejo de divisiones por cero.
* ✅ **Interfaz moderna**: Diseño *Dark Mode* estilizado con **Tailwind CSS**.
* ✅ **Accesibilidad**: Etiquetas ARIA implementadas para lectores de pantalla.

---

## 📦 Estructura del Proyecto

```text
src/
├── components/
│   ├── Calculator.tsx       # Componente principal de la calculadora
│   ├── CalculatorButton.tsx # Botones reutilizables
│   └── ui/
│       └── button.ts        # Componente base de botón
├── utils/
│   └── calculate.ts         # Lógica de cálculos aritméticos
├── App.tsx                  # Componente raíz
├── index.css                # Estilos globales (Tailwind)
└── main.tsx                 # Punto de entrada
````

### 📄 Descripción de archivos principales

  * **`Calculator.tsx`**: Gestiona el estado global (pantalla, valores actuales y operaciones), maneja eventos de teclado y formatea la visualización (máx. 12 caracteres).
  * **`CalculatorButton.tsx`**: Soporta variantes visuales (`number`, `operation`, `equals`, `destructive`, `outline`) y permite configurar el ancho de columnas (como el botón "0").
  * **`calculate.ts`**: Contiene funciones puras para operaciones matemáticas, validación de errores y redondeo de precisión.

-----

## 🚀 Instalación

Sigue estos pasos para ejecutar el proyecto localmente:

1.  **Clona el repositorio:**

    ```bash
    git clone [https://github.com/Yil-Kanda-React/React-Calculator.git](https://github.com/Yil-Kanda-React/React-Calculator.git)
    cd React-Calculator
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

    La aplicación estará disponible en: `http://localhost:5173`

-----

## 💻 Uso

### Con el ratón 🖱️

1.  Haz clic en los números.
2.  Selecciona una operación (`+`, `-`, `×`, `÷`).
3.  Presiona `=` para obtener el resultado.

### Con el teclado ⌨️

| Tecla | Acción |
| :--- | :--- |
| `0-9` | Ingresar dígitos |
| `.` | Punto decimal |
| `+`, `-`, `*`, `/` | Operaciones aritméticas |
| `Enter` o `=` | Calcular resultado |
| `Backspace` | Borrar último dígito |
| `Escape` | Limpiar pantalla (C) |

-----

## 🛠️ Stack Tecnológico

  * **React 18+**: Biblioteca principal para la UI.
  * **TypeScript**: Tipado estático para un código robusto.
  * **Tailwind CSS**: Estilizado mediante utilidades.
  * **Lucide React**: Set de iconos modernos.
  * **Vite**: Herramienta de construcción rápida.

-----

## 🎨 Paleta de Colores

  * 🌑 **Fondo:** Slate 900
  * 🔢 **Números:** Slate 700
  * ➗ **Operaciones:** Blue 500
  * ✅ **Igual:** Emerald 600
  * ❌ **Limpiar:** Red 600

-----

## 🔧 Detalles de Desarrollo

### Estructura del Estado

```typescript
interface CalculatorState {
  display: string;            // Valor mostrado en pantalla
  currentValue: string;       // Número actual siendo ingresado
  previousValue: string;      // Número anterior a la operación
  operation: Operation;       // Operación seleccionada (+, -, ×, ÷)
  waitingForOperand: boolean; // Flag para el siguiente número
}
```

### Funcionalidades avanzadas

  * **Validación de entrada**: Evita múltiples ceros iniciales y gestiona puntos decimales únicos.
  * **Operaciones encadenadas**: Permite realizar secuencias como `5 + 5 + 5` sin presionar igual repetidamente.
  * **Precisión**: Los resultados se redondean a 8 decimales para evitar errores comunes de JavaScript.

-----

## 📝 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Creado por [Yil Kanda](https://github.com/YilKanda).
