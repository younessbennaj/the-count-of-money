//hoc => function that takes an intial component and returns this component wrapped by a wrapper component that contains
//reusable logic 
//=> in our case we need that main page component should be wrapped by a default layout 
import React, { Component } from 'react';

export function withLayout(Wrapped) {

    return class extends Component {
        constructor(props) {
            //props passed to the parent class Component()
            super(props);
        }
        render() {
            return (
                <>
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold leading-tight text-gray-900">
                                {this.props.title}
                            </h1>
                        </div>
                    </header>
                    <main>
                        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                            <div className="px-4 py-6 sm:px-0">
                                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                                    <Wrapped />
                                </div>
                            </div>
                        </div>
                    </main>
                </>
            );
        }

    }
}