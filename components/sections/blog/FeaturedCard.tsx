"use client";

import {
    Calendar,
    Clock,
    User,
    ArrowRight,
    FileWarning,
    Cloud,
    Lightbulb,
    Wrench,
    Map,
    BarChart3,
    DollarSign,
    LineChart,
    ShoppingCart,
    MessageSquare,
    Car,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateES } from "@/lib/format";
import type { BlogPost } from "@/types/blog";

export default function FeaturedCard({ post }: { post: BlogPost }) {
    return (
        <Card
            key={post.id}
            className={`glassmorphism transition-all duration-300 hover:scale-105 overflow-hidden ${post.category === "Marketing Digital"
                ? "border-tertiary hover:border-tertiary/60 hover:shadow-lg hover:shadow-tertiary/20"
                : "border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20"
                }`}
        >
            <div className="gradient-border-content flex flex-col h-full">
                {/* Imagen superior */}
                <div className="relative">
                    <img
                        src={post.image}
                        className="w-full h-48 object-cover rounded-t-lg"
                        loading="lazy"
                    />
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white">
                        Destacado
                    </Badge>
                </div>

                {/* Contenido */}
                <CardContent className="p-6 flex flex-col flex-1">
                    {/* Meta info */}
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDateES(post.date)}
                        </div>
                        <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                        </div>
                        <Badge variant="outline" className="text-xs">
                            {post.category}
                        </Badge>
                    </div>

                    {/* Título */}
                    <h3 className="text-xl font-bold mb-3 text-balance">{post.title}</h3>

                    {/* 🔹 Contenido visual por categoría */}
                    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                        {post.category === "Automotriz" && (
                            <>
                                <Step
                                    number="1"
                                    icon={<FileWarning className="h-5 w-5 text-primary" />}
                                    title="Revisa tus multas"
                                    text="Antes de agendar la cita, entra al portal de la AMT y verifica que no tengas valores pendientes. Sin eso, no podrás aprobar la revisión."
                                />
                                <Step
                                    number="2"
                                    icon={<Cloud className="h-5 w-5 text-primary" />}
                                    title="Cuida las emisiones (el punto más crítico)"
                                    text="Gasolina: limpia inyectores, cambia filtros y bujías. Diésel: evita humo negro revisando el sistema de combustión. El 70 % de los rechazos se da aquí."
                                />
                                <Step
                                    number="3"
                                    icon={<Lightbulb className="h-5 w-5 text-primary" />}
                                    title="Chequea las luces"
                                    text="Una bombilla quemada puede hacerte perder la cita. Prueba direccionales, freno, bajas y altas."
                                />
                                <Step
                                    number="4"
                                    icon={<Car className="h-5 w-5 text-primary" />}
                                    title="Frenos y suspensión firmes"
                                    text="Revisa pastillas, discos y amortiguadores. Asegúrate de que no haya fugas ni ruidos. Un auto estable pasa sin problema." />
                                <Step
                                    number="5"
                                    icon={<Wrench className="h-5 w-5 text-primary" />}
                                    title="Haz mantenimiento básico"
                                    text="Aceite, líquidos y filtros en orden. Demuestra que tu vehículo está cuidado."
                                />
                                <div className="border-t pt-3">
                                    <p className="font-semibold text-foreground">
                                        Resumen rápido:
                                    </p>
                                    <p className="text-muted-foreground">
                                        Los fallos más comunes son emisiones y luces de freno. Si
                                        cuidas esos puntos, la revisión es prácticamente segura.
                                    </p>
                                </div>
                            </>
                        )}

                        {post.slug === "marketing-digital-pymes-ecuador" && (
                            <>
                                <Block
                                    icon={<Map className="h-6 w-6 text-tertiary" />}
                                    title="Ecuador está más conectado que nunca"
                                    text="El 83,6 % de los ecuatorianos tiene acceso a internet y más del 69 % usa redes sociales activamente. Tus futuros clientes están en línea — y desde su celular."
                                />
                                <Block
                                    icon={<BarChart3 className="h-6 w-6 text-tertiary" />}
                                    title="Las PYMEs ya están dando el paso"
                                    text="El 91 % de las pequeñas y medianas empresas planea invertir en digitalización este año. Los resultados: más visibilidad y más ventas."
                                />
                                <Block
                                    icon={<DollarSign className="h-6 w-6 text-tertiary" />}
                                    title="El marketing digital es inversión, no gasto"
                                    text="El 72 % de las empresas que apostaron por estrategias digitales lograron retorno positivo en menos de un año."
                                />
                                <p className="font-semibold text-foreground">
                                    Conclusión:
                                    <span className="block font-normal text-muted-foreground">
                                        Si eres dueño de una PYME, el momento es ahora. Tener una
                                        estrategia digital clara significa conectar, medir y crecer.
                                    </span>
                                </p>
                            </>
                        )}

                        {post.slug ===
                            "como-el-marketing-digital-impulsa-ventas-en-pymes-ecuatorianas" && (
                                <>
                                    <Step
                                        number="1"
                                        icon={<LineChart className="h-5 w-5 text-tertiary" />}
                                        title="Mide todo y mejora rápido"
                                        text="Con herramientas como Google Analytics o Meta Business Suite puedes saber qué campañas funcionan y ajustar tu presupuesto."
                                    />
                                    <Step
                                        number="2"
                                        icon={<ShoppingCart className="h-5 w-5 text-tertiary" />}
                                        title="Visibilidad que genera confianza"
                                        text="En 2024, el comercio electrónico en Ecuador superó los USD 5 000 millones y crecerá más del 20 % en 2025. La presencia digital genera credibilidad."
                                    />
                                    <Step
                                        number="3"
                                        icon={<MessageSquare className="h-5 w-5 text-tertiary" />}
                                        title="Conexión directa con tu público"
                                        text="Redes sociales, chatbots y correo electrónico permiten conversaciones útiles y humanas que fortalecen la relación con el cliente."
                                    />
                                    <p className="font-semibold text-foreground">
                                        Conclusión:
                                        <span className="block font-normal text-muted-foreground">
                                            El marketing digital te permite hacer más con menos: llegar
                                            a más personas, medir resultados y optimizar tu inversión.
                                        </span>
                                    </p>
                                </>
                            )}
                    </div>

                    {/* Autor */}
                    <div className="flex items-center justify-between mt-6 pt-3 border-t border-border/50">
                        <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 ml-2 opacity-60" />
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

/* 🔹 Subcomponentes reutilizables */

function Step({
    number,
    icon,
    title,
    text,
}: {
    number: string;
    icon: JSX.Element;
    title: string;
    text: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="flex-shrink-0 text-xs font-bold flex items-center justify-center w-6 h-6 border border-primary rounded-full text-primary">
                {number}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    {icon}
                    <h4 className="font-semibold text-foreground">{title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-snug">{text}</p>
            </div>
        </div>
    );
}

function Block({
    icon,
    title,
    text,
}: {
    icon: JSX.Element;
    title: string;
    text: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="flex-shrink-0">{icon}</div>
            <div>
                <h4 className="font-semibold text-foreground mb-1">{title}</h4>
                <p className="text-sm text-muted-foreground leading-snug">{text}</p>
            </div>
        </div>
    );
}
