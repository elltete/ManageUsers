import { randomUUID } from "node:crypto";
import { writeFileSync, readFileSync, existsSync } from "node:fs";

const handleError = (error, path) => {
    try{
        const existsFile = existsSync(path);

        if (!existsFile){
            writeFileSync(path);
            handleError(new Error("CREATING FILE", path));
        }

        const errorData = JSON.parse(readFileSync(path));

        const newError = {
            id: randomUUID(),
            type: error.message,
            date: new Date().toISOString(),
        }

        errorData.push(newError);

        writeFileSync(path, JSON.stringify(errorData));

    } catch (error) {

    }
}

export { handleError }