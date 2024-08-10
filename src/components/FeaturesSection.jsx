import { features } from "../data/features";

export default function FeatureSection() {
    return <>
            <div className="flex items-center p-10 justify-center flex-col">
                <h2 className="font-extrabold text-3xl mb-8 pt-3 text-white">
                    Here is some <span className="text-highlight text-3xl">FEATURES</span>...
                </h2>
                <div className="mt-10 grid items-center grid-cols-1 gap-3 md:grid-cols-3 max-w-screen-xl">
                    {
                        features.map((feature, index) => (
                            <div 
                                key={index} 
                                className="bg-black border border-highlight/30 rounded-lg shadow-lg p-6 h-full flex space-x-4"
                            >
                                <div className="flex flex-col">
                                    <div className="flex flex-row items-center">
                                        <img
                                            src={feature.icon}
                                            alt={feature.name + "icon"}
                                            className="h-[50px] pointer-events-none"
                                        />
                                        <h3 className="font-bold text-xl text-white pl-5">{feature.title}</h3>
                                    </div>
                                    <p className="pt-5 text-white">{feature.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
}