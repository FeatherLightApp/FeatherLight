const useDateConversion = () => {
    function epochToHuman (t: number) {
        const d = new Date(t * 1000)
        return `${d.getDay()}/${d.getMonth()+1}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`
    }

    return {
        epochToHuman
    }
}

export default useDateConversion