export default class Loader {
    constructor(private className: string) {

    }

    showElement(node: Element): void {
        const loader: HTMLDivElement = document.createElement('div');
        loader.classList.add(this.className);

        loader.innerHTML = '<img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMDI5YjhiZDktY2I1YS00MWU0LTljN2UtZWU1MTZmYWNlOWJiXC9kYXlvM293LTdhYzg2YzMxLThiMmItNDgxMC04OWYyLWU2MTM0Y2FmMWYyZC5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.LJBxDkRocQStjZpmj9Injfv73mG2SQZ8X6HNdlP5WHw" alt="loading..." class="loader" >'
        
        node.append(loader);
    }
}