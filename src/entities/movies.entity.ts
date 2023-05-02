import { Entity, Column, PrimaryGeneratedColumn, AfterLoad } from "typeorm";

@Entity("movies")
class Movie {
    @PrimaryGeneratedColumn("increment") //um valor defalt se passaria aqui {default: "(valor)"}
    id: number
    
    @Column({ type: "varchar", length: 50, unique: true })
    name: string

    @Column({ type: "text" ,nullable: true })
    description?: string | null | undefined

    @Column({ type: "integer" })
    duration: number

    @Column({ type: "integer" })
    price: number

}

export default Movie;
