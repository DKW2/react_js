import React, {useState, useMemo} from "react";

function SortNumbers() {
    const [nums, setNums] = useState([1,5,3,9,2,6,7,8,4,10]);
    const [draggedIndex, setDraggedIndex] = useState(null);

    function handleDragStart(index) {
        setDraggedIndex(index);
    }

    function handleDragOver(e) {
        e.preventDefault(); // allows dropping
    }

    function handleDrop(index) {
        if (draggedIndex === null) return;
    
        // copy array
        const updated = [...nums];
        // remove the dragged item
        const [movedItem] = updated.splice(draggedIndex, 1);
        // insert it into the new position
        updated.splice(index, 0, movedItem);
    
        setNums(updated);
        setDraggedIndex(null);
    }

    function sortNums(){
        setNums( (prev) => prev.toSorted( (a,b) => a - b ) );
    }
    function randomizeNums(){

        const newArr = [];
        let ind = nums.length;

        while( ind !== 0 ){
            let randomIndex = Math.floor(Math.random() * ind);
            ind--;

            newArr.push( nums[randomIndex] );

            [nums[ind], nums[randomIndex]] = [nums[randomIndex], nums[ind]]
        }

        setNums( newArr );
    }

    return (
        <div>
            <div style={{ display: "flex", gap: "8px" }}>
            {nums.map((num, index) => (
                <p
                key={num}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                className="drag-number cursor-move border border-gray-400 rounded p-2 w-12 text-center"
                >
                {num}
                </p>
            ))}
            </div>
            <button onClick={sortNums}>Sort</button>
            <button onClick={randomizeNums}>Randomize</button>
        </div>
    )
}

export default SortNumbers;