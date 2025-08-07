//apiの処理(DB処理の部分にリクエスト渡してその結果を返す)
import { findPersonById } from "src/infrastructure/person";

export const getPersonUseCase = async (personId: number) => {

    const person = await findPersonById(personId);

    if (!person) {
        return null;
    }

    return {
        name: person.name,
        gender: person.gender,
        job: person.job,
        hobbies: person.hobbies.map((h: any) => h.hobby.name),
    };
};