import people_data from '../data/people_data.json';

export class PeopleProcessing {
    getById(id: number) {
        return people_data.find((p) => p.id === id);
    }

    getAll(term?: string, page: number = 1) {
        let filteredPeople = people_data;
        const total = people_data.length;
        if (term) {
            filteredPeople = people_data.filter((p) => {
            const fullName = `${p.first_name} ${p.last_name}`;

            return fullName.toLowerCase().includes(term.toLowerCase());
          })
        }

        return {
            data: filteredPeople.slice((page - 1) * 20, page * 20),
            total,
            page,
        };
    }
}
