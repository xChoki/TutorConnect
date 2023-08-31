

export default function IndexPage() {
    return (
        <div className="flex flex-col items-center h-screen bg-gray-100">
            <div className="w-full h-[70vh] mt-0 relative">
                <img src="./src/assets/head.png" alt="Pencils" className="w-full h-auto mt-0" />
                <p className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold text-white">
                    ¡Bienvenidos a TutorConnect!
                </p>
            </div>

            <div className="flex justify-between w-11/12 mt-6">
                <div className="bg-white rounded-lg p-4 flex-1 mr-4 flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-2">Contenedor 1</h2>
                    <p className="text-lg">Tutores registrados.</p>
                </div>
                <div className="bg-white rounded-lg p-4 flex-1 mr-4 flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-2">Contenedor 2</h2>
                    <p className="text-lg">Cursos disponibles.</p>
                </div>
                <div className="bg-white rounded-lg p-4 flex-1 flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-2">Contenedor 3</h2>
                    <p className="text-lg">Alumnos registrados.</p>
                </div>
            </div>

            <div className="bg-white rounded-lg p-6 mt-6 w-11/12 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold mb-4">Sobre nosotros</h2>
                <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem cum inventore obcaecati facere! Non optio ullam labore delectus minima dolorem atque suscipit nihil? Impedit minima, debitis recusandae harum explicabo ipsum. Libero, iusto, consequatur rerum, quidem eum nam veniam omnis placeat voluptas itaque at dolor? Debitis temporibus quas repellat adipisci. Exercitationem pariatur fugiat minima praesentium earum delectus dicta animi quos laborum incidunt necessitatibus, voluptate deleniti et eaque quo reiciendis unde itaque modi! Iusto natus fugit odio expedita aut eligendi ullam corporis incidunt temporibus saepe ratione pariatur consectetur, at perferendis, rem velit esse, debitis nihil iste aperiam vero dolorem? Adipisci, error voluptatem?
                </p>
            </div>

            {/* Agregar espacio adicional aquí */}
            <div className="mb-8"></div>

            {/* Footer */}
            <footer className="bg-gray-400 text-white p-4 text-center w-full">
                Este es el pie de página. Coloca aquí tus enlaces y contenido relacionado.
            </footer>
        </div>
    );
}
