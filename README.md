# TDS Solutions Technical Test

This is my solution for the techincal test for TDS by Marcin Daber.

# Instructions on running

- Set the `CURRENCY_API_TOKEN` environment variable. 

- Run the standard `npm install --save-dev` (or `npm install` for a production build)

- Run the project with `npm run dev` (or `npm run build && npm start` for the production build)

- Visit the site at `http://localhost:3000`.


## Where I'd go in improving this further.

 -  The currency input box is buggy. This is consequence of currency notation being a notoriously difficult problem.

    The closest I've been able to find of a real working currency input box is [here](https://github.com/cchanxzy/react-currency-input-field/blob/main/src/components/CurrencyInput.tsx).

    As you can see, it's incredibly heavy-handed for this technical test.

    If I were to do it again, I think I would think of some clever two-input-box solution that would instantly swap between each other upon using arrow keys or finishing what you were writing.

    Currently, it is impossible to convert $0.01 into anything; you would have to convert minimally $0.10. This is quite a large flaw, but the solution would take some hours (or remove the functionality that exists within the existing solution, or require the use of a third party library).

 -  I would prefer to use a more complete test framework like Playwright.
    
    That would take more time to setup than the 2h allotted. 

    It would also allow me to reach close to 100% test coverage. This is difficult in Next.js due to the many different types of files we use and how differently they run in reality.

 -  A button between the two selectors to swap currencies instantly (which would also perform a conversion on the new amounts).
 
    It's just helpful.


## Some thoughts you may be having - addressed.

### Why Next.js?

It is impossible to do this with *pure* React *without leaking your API key*. 

This is because React is a frontend-only framework. There would be no backend running anywhere which could store the key.

As such, someone could take the key directly and use it for their own needs, and run out your free tier.

I did also have the idea of doing this in React and requiring the user to input their API key. This is definitely not orthodox for a web application and I did not think it to be an appropriate solution.


### But this has an unguarded API endpoint. Can't they do the same with that?

My presumption is that this would be hidden behind some auth; that auth middleware could be added quickly.